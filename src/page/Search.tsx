import Select from "@/components/Select";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react"
import { GetSearchMangaRequestOptions, MangaContentRating, MangaPublicationDemographic, getMangaList, getTag, MangaPublicationStatus } from "@/api/manga";
import { Tag } from "@/api/schema";
import { Includes, Order } from "@/api/static";
import Card from "@/components/Card";
import { ExtendManga } from "@/api/extend";
import { useNavigate, useParams } from "react-router-dom";

const sortByData = ['Đánh giá giảm dần', 'Đánh giá tăng dần', 'Lượt theo dõi giảm dần', 'Lượt theo dõi tăng dần', 'Mới thêm gần đây', 'Thêm cũ nhất', 'Năm tăng dần', 'Năm giảm dần']
const contentRatingData = [MangaContentRating.SAFE, MangaContentRating.EROTICA, MangaContentRating.PORNOGRAPHIC, MangaContentRating.SUGGESTIVE]
const demographicData = [MangaPublicationDemographic.JOSEI, MangaPublicationDemographic.SEINEN, MangaPublicationDemographic.SHOUJO, MangaPublicationDemographic.SHOUNEN]
const publicationStatusData = [MangaPublicationStatus.ONGOING, MangaPublicationStatus.COMPLETED, MangaPublicationStatus.CANCELLED, MangaPublicationStatus.HIATUS]


export default function Search() {
  const navigate = useNavigate();
  const { tagId } = useParams();

  const [searchValue, setSearchValue] = useState('')
  const [searchResult, searchResultLoading] = useState<ExtendManga[]>([]);
  const [showFilter, setShowFilter] = useState(false)
  const [page, setPage] = useState(1)

  const [sort, setSort] = useState<string>('none')
  const [contentRating, setContentRating] = useState<MangaContentRating[]>([])
  const [tagData, setTagData] = useState<Tag[]>([]);
  const [tag, setTag] = useState<Tag[]>([])
  const [demographic, setDemographic] = useState<MangaPublicationDemographic>(MangaPublicationDemographic.NONE)
  const [publicationStatus, setPublicationStatus] = useState<MangaPublicationStatus[]>([])

  useEffect(() => {
    getTag()
      .then((data) => {
        data.data.sort(function (a, b) {
          if (a.attributes.name.en < b.attributes.name.en) {
            return -1;
          }
          if (a.attributes.name.en > b.attributes.name.en) {
            return 1;
          }
          return 0;
        });
        setTagData(data.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])


  const handleChange = (e: { target: { value: string; }; }) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    const searchParams: GetSearchMangaRequestOptions = {
      title: searchValue,
      includes: [Includes.COVER_ART],
      order: { followedCount: Order.DESC },
      limit: 30,
      offset: (page - 1) * 30,
      availableTranslatedLanguage: ['vi']
    };

    if (tag.length !== 0) {
      searchParams.includedTags = tag.map((t) => t.id)
    }

    if (demographic !== MangaPublicationDemographic.NONE) {
      searchParams.publicationDemographic = [demographic]
    }

    if (publicationStatus.length !== 0) {
      searchParams.status = publicationStatus
    }

    if (contentRating.length !== 0) {
      searchParams.contentRating = contentRating
    }

    getMangaList(searchParams).then(data => {
      console.log(data)
      searchResultLoading(data)
    }).catch(e => console.log(e))
  }

  useEffect(() => {
    if (tagId) {
      const searchParams: GetSearchMangaRequestOptions = {
        includes: [Includes.COVER_ART],
        order: { followedCount: Order.DESC },
        limit: 30,
        offset: (page - 1) * 30,
        availableTranslatedLanguage: ['vi'],
        includedTags: [tagId]
      };

      getMangaList(searchParams).then(data => {
        console.log(data)
        searchResultLoading(data)
      }).catch(e => console.log(e))
    }
  }, [tagId])

  return (
    <div className="w-full px-5 min-h-screen">
      <div className="flex items-center gap-3 mb-5 cursor-pointer" onClick={() => navigate(-1)}> <Icon icon="ph:arrow-left-bold" width={24} /><h2 className="text-xl">Tìm kiếm nâng cao</h2></div>
      <div className="flex w-full mb-5">
        <div className='relative mr-4 bg-[#F6F6F6] rounded-lg p-2 md:p-0 ml-auto grow'>
          <Icon icon="radix-icons:magnifying-glass" className="text-[24px] md:absolute inline top-1/2 md:-translate-y-1/2 left-4" />
          <input className="bg-[#F6F6F6] w-full p-3 pl-12 text-md text-gray-900 rounded-lg hidden md:block outline-primary"
            type="search"
            placeholder="Tìm kiếm truyện, tác giả..."
            value={searchValue}
            onChange={handleChange} />
        </div>
        <button className="flex items-center w-[150px] h-[48px] bg-primary text-white gap-2 justify-center rounded-md" onClick={() => setShowFilter(prev => !prev)}><Icon icon="ep:arrow-down-bold" className={`transition-all ${showFilter ? 'rotate-180' : ''}`} /><span>Hiện filter</span></button>
      </div>
      <div className={`grid grid-cols-4 gap-5 transition-all ${showFilter ? 'h-[150px]' : 'h-0 overflow-hidden'}`}>
        <Select title="Sắp xếp" data={sortByData} state={sort} setState={setSort} defaultValue='none' />
        <Select title="Thể loại" data={tagData} state={tag} setState={setTag} type="tag" />
        <Select title="Xếp loại nội dung" data={contentRatingData} state={contentRating} setState={setContentRating} type='multipleChoice' />
        <Select title="Đối tượng" data={demographicData} state={demographic} setState={setDemographic} defaultValue={MangaPublicationDemographic.NONE} />
        <Select title="Tình trạng" data={publicationStatusData} state={publicationStatus} setState={setPublicationStatus} type="multipleChoice" />
      </div>
      <div className="flex justify-end gap-2">
        <button className="flex items-center w-[100px] h-[40px] hover:bg-gray-100 text-primary gap-2 justify-center rounded-md" onClick={() => {
          setSort('')
          setTag([])
          setContentRating([])
          setDemographic(MangaPublicationDemographic.NONE)
          setPublicationStatus([])
        }}>Reset filter</button>
        <button className="flex items-center w-[100px] h-[40px] bg-primary text-white gap-2 justify-center rounded-md" onClick={handleSearch}>Tìm kiếm</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 mt-5">
        {searchResult.map((manga: ExtendManga, idx) => <Card manga={manga} key={idx} />)}
      </div>
    </div>
  )
}
