import Select from "@/components/Select";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react"
import { GetSearchMangaRequestOptions, MangaContentRating, MangaPublicationDemographic, MangaPublicationStatus, GetSearchMangaOrder, getMangaTag } from "@/api/manga";
import { Tag } from "@/api/schema";
import Card from "@/components/Card";
import { ExtendManga } from "@/api/extend";
import { useNavigate, useSearchParams } from "react-router-dom";
import convertSearchParams from "@/utils/convertSearchParams";
import buildQueryString from "@/utils/buildQueryString";
import ReactPaginate from "react-paginate";
import { Order } from "@/api/static";
import useSearchManga from "@/hooks/useSearchManga";
type sortOrder = {
  title: string
  value: GetSearchMangaOrder
}

const sortByData: sortOrder[] = [
  { title: 'Mới cập nhật', value: { updatedAt: Order.DESC } },
  { title: 'Cập nhật cũ nhất', value: { updatedAt: Order.ASC } },
  { title: 'Đánh giá giảm dần', value: { rating: Order.DESC } },
  { title: 'Đánh giá tăng dần', value: { rating: Order.ASC } },
  { title: 'Lượt theo dõi giảm dần', value: { followedCount: Order.DESC } },
  { title: 'Lượt theo dõi tăng dần', value: { followedCount: Order.ASC } },
  { title: 'Mới thêm gần đây', value: { createdAt: Order.DESC } },
  { title: 'Thêm cũ nhất', value: { createdAt: Order.ASC } },
  { title: 'Năm tăng dần', value: { year: Order.ASC } },
  { title: 'Năm giảm dần', value: { year: Order.DESC } }]
const contentRatingData = [MangaContentRating.SAFE, MangaContentRating.EROTICA, MangaContentRating.PORNOGRAPHIC, MangaContentRating.SUGGESTIVE]
const demographicData = [MangaPublicationDemographic.JOSEI, MangaPublicationDemographic.SEINEN, MangaPublicationDemographic.SHOUJO, MangaPublicationDemographic.SHOUNEN]
const publicationStatusData = [MangaPublicationStatus.ONGOING, MangaPublicationStatus.COMPLETED, MangaPublicationStatus.CANCELLED, MangaPublicationStatus.HIATUS]


export default function Search() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const options = convertSearchParams(searchParams)
  console.log("option: ", options)
  const { data, isLoading } = useSearchManga(options)
  const offset = searchParams.get("offset") ? parseInt(searchParams.get("offset")!) : 0
  const total = data ? data.total : 0
  const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : 24
  const page = Math.floor(offset / limit)

  const [searchValue, setSearchValue] = useState(searchParams.get('title') || '')
  const [showFilter, setShowFilter] = useState(false)
  const [sort, setSort] = useState<sortOrder | null>(sortByData.find(obj => obj == options.order) || null)
  const [contentRating, setContentRating] = useState<MangaContentRating[]>(searchParams.getAll("contentRating[]") as MangaContentRating[] || [])
  const [tagData, setTagData] = useState<Tag[]>([]);
  const [tag, setTag] = useState<Tag[]>([])
  const [demographic, setDemographic] = useState<MangaPublicationDemographic[]>(searchParams.getAll("publicationDemographic[]") as MangaPublicationDemographic[] || [])
  const [publicationStatus, setPublicationStatus] = useState<MangaPublicationStatus[]>([])

  useEffect(() => {
    getMangaTag()
      .then((data) => {
        data.data.data.sort(function (a, b) {
          if (a.attributes.name.en < b.attributes.name.en) {
            return -1;
          }
          if (a.attributes.name.en > b.attributes.name.en) {
            return 1;
          }
          return 0;
        });
        setTagData(data.data.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  useEffect(() => {
    if (tagData.length !== 0) {
      const tagIds = searchParams.getAll("includedTags[]")
      const selectedTags: Tag[] = [];
      let tag: Tag | undefined
      tagIds.forEach(tagId => {
        tag = tagData.find(t => t.id === tagId)
        if (tag) {
          selectedTags.push(tag)
        }
      });
      setTag(selectedTags)
    }
  }, [searchParams, tagData])


  const handleChange = (e: { target: { value: string; }; }) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    const searchParams: GetSearchMangaRequestOptions = {};

    if (searchValue.length !== 0) {
      searchParams.title = searchValue
    }

    if (sort !== null) {
      searchParams.order = sort.value
    }

    if (tag.length !== 0) {
      searchParams.includedTags = tag.map((t) => t.id)
    }

    if (demographic.length !== 0) {
      searchParams.publicationDemographic = demographic
    }

    if (publicationStatus.length !== 0) {
      searchParams.status = publicationStatus
    }

    if (contentRating.length !== 0) {
      searchParams.contentRating = contentRating
    }

    navigate(`${buildQueryString(searchParams)}`)
  }

  const handlePageClick = (event: { selected: number; }) => {
    setSearchParams(prev => {
      prev.set("offset", (event.selected * 24).toString())
      return prev
    })
  };

  const onFormSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    handleSearch();
  }


  return (
    <div className="w-full px-5 min-h-screen">
      <button className="flex items-center gap-3 mb-5 cursor-pointer" onClick={() => navigate(-1)}> <Icon icon="ph:arrow-left-bold" width={24} /><h2 className="text-xl">Tìm kiếm nâng cao</h2></button>
      <div className="flex w-full mb-5">
        <div className='relative mr-4 bg-[#F6F6F6] rounded-lg p-2 md:p-0 ml-auto grow'>
          <Icon icon="radix-icons:magnifying-glass" className="text-[24px] md:absolute inline top-1/2 md:-translate-y-1/2 left-4" />
          <form onSubmit={onFormSubmit}>
            <input className="bg-[#F6F6F6] w-full p-3 pl-12 text-md text-gray-900 rounded-lg hidden md:block outline-primary"
              type="search"
              placeholder="Tìm kiếm truyện, tác giả..."
              value={searchValue}
              onChange={handleChange} />
          </form>
        </div>
        <button className="flex items-center w-[150px] h-[48px] bg-primary text-white gap-2 justify-center rounded-md" onClick={() => setShowFilter(prev => !prev)}><Icon icon="ep:arrow-down-bold" className={`transition-all ${showFilter ? 'rotate-180' : ''}`} /><span>Hiện filter</span></button>
      </div>
      <div className={`grid grid-cols-4 gap-5 transition-all ${showFilter ? 'h-[150px]' : 'h-0 overflow-hidden'}`}>
        <Select title="Sắp xếp" data={sortByData} state={sort} setState={setSort} type="order" />
        <Select title="Thể loại" data={tagData} state={tag} setState={setTag} type="tag" />
        <Select title="Xếp loại nội dung" data={contentRatingData} state={contentRating} setState={setContentRating} type='multipleChoice' />
        <Select title="Đối tượng" data={demographicData} state={demographic} setState={setDemographic} type='multipleChoice' />
        <Select title="Tình trạng" data={publicationStatusData} state={publicationStatus} setState={setPublicationStatus} type="multipleChoice" />
      </div>
      <div className="flex justify-end gap-2">
        <button className="flex items-center w-[100px] h-[40px] hover:bg-gray-100 text-primary gap-2 justify-center rounded-md" onClick={() => {
          setSort(sortByData[0])
          setTag([])
          setContentRating([])
          setDemographic([])
          setPublicationStatus([])
        }}>Reset filter</button>
        <button className="flex items-center w-[100px] h-[40px] bg-primary text-white gap-2 justify-center rounded-md" onClick={handleSearch}>Tìm kiếm</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 mt-5">
        {isLoading || !data ? <div>Loading</div> : data?.data.map((manga, idx) => <Card manga={manga} key={idx} />)}
      </div>

      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={Math.floor(total / limit)}
        previousLabel="<"
        renderOnZeroPageCount={null}
        marginPagesDisplayed={2}
        className="flex gap-2 items-center justify-center m-5"
        pageClassName="block px-3 py-1 rounded-md hover:bg-gray-200"
        activeClassName="text-white bg-primary hover:bg-primary"
        previousClassName="block px-3 py-1 rounded-md hover:bg-gray-200"
        nextClassName="block px-3 py-1 rounded-md hover:bg-gray-200"
        breakClassName="text-center"
        forcePage={page}
      />
    </div>
  )
}
