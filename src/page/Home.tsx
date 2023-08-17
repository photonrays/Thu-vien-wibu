import Slider, { Settings } from "react-slick";
import { Card } from "@/components/Card";
import { DetailCard } from "@/components/DetailCard";
import { useEffect, useState, useRef } from 'react';
import { getMangasByIds, getPopularNewTitle, getTag } from "@/api/manga";
import { Tag } from '../api/schema';
import Iconify from "@/components/Iconify";
import { TagItem } from "@/components/TagItem";
import { ExtendChapter, ExtendManga } from "@/api/extend";
import { getLatestChapter } from "@/api/chapter";

export default function Home() {
  const settings: Settings = {
    dots: false,
    infinite: true,
    lazyLoad: "ondemand",
    speed: 500,
    draggable: false,
    slidesToShow: 4,
    slidesToScroll: 3
  };

  const sliderRef = useRef<Slider | null>(null);

  const next = () => {
    sliderRef.current?.slickNext();
  };

  const previous = () => {
    sliderRef.current?.slickPrev();
  };


  const [popularManga, setPopularManga] = useState<ExtendManga[]>();
  const [tag, setTag] = useState<Tag[]>();
  const [latestChapters, setLatestChapters] = useState<ExtendChapter[]>()
  const [page, setPage] = useState(1);
  const [mangas, setMangas] = useState<Record<string, ExtendManga>>()
  const [chapters, setChapters] = useState<Record<string, ExtendChapter[]>>({})


  useEffect(() => {
    getPopularNewTitle()
      .then((data) => {
        setPopularManga(data);
      })
      .catch((err) => {
        console.log(err);
      });

    getTag()
      .then((data) => {
        setTag(data.data.slice(0, 30))
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  useEffect(() => {
    if (page > 0) {
      getLatestChapter(page)
        .then(data => setLatestChapters(data))
        .catch((err) => {
          console.log(err);
        });
    }
  }, [page])

  useEffect(() => {
    if (latestChapters) {
      const updates: Record<string, ExtendChapter[]> = {}
      for (const chapter of latestChapters) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        const mangaId = chapter.manga?.id!
        if (!updates[mangaId]) {
          updates[mangaId] = []
        }
        updates[mangaId].push(chapter)
      }
      setChapters(updates)
      getMangasByIds(Object.keys(chapters))
        .then(data => {console.log(data);setMangas(data)})
        .catch((err) => {
          console.log(err);
        });
    }
  }, [latestChapters])

  return (
    <div className="w-full">
      {/*Top manga*/}
      <section className="mb-8">
        <h2 className="text-2xl font-bold">Truyện đề cử</h2>
        <div className="max-w-full relative px-5">
          <Slider ref={sliderRef} {...settings}>
            {popularManga?.map((manga, idx) => {
              return <div key={idx}>
                <Card ranking={idx + 1} manga={manga} />
              </div>
            })}
          </Slider>
          <Iconify className="absolute top-1/2 -translate-y-1/2 left-0 hover:cursor-pointer bg-slate-100 rounded-full" icon="iconamoon:arrow-left-2" onClick={previous} width={40} />
          <Iconify className="absolute top-1/2 -translate-y-1/2 right-0 hover:cursor-pointer bg-slate-100 rounded-full" icon="iconamoon:arrow-right-2" onClick={next} width={40} />
        </div>
      </section>

      <section className="grid grid-cols-2 gap-20 mb-14">
        {/*Continue reading*/}
        <div>
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">Tiếp tục đọc...</h2>
            <button className="h-[40px] bg-primary rounded-3xl inline-flex items-center px-5 text-white">Xem tất cả</button>
          </div>
          <div className="bg-[#F0F4FF] w-full mt-5 rounded-3xl">
            
          </div>
        </div>
        {/*Popular tag*/}
        <div className="w-full rounded-3xl">
          <h2 className="text-2xl font-bold mb-3">Khám phá các thể loại nổi tiếng</h2>
          {tag?.map((item, idx) => {
            return <TagItem key={idx} name={item.attributes.name.en} />
          })}
          <button className="h-[40px] bg-primary rounded-3xl inline-flex items-center px-5 text-white m-2 ">Xem tất cả</button>
        </div>
      </section>

      {/* Latest update */}
      <section>
        <div className="flex justify-between">
            <h2 className="text-2xl font-bold mb-8">Mới cập nhật</h2>
            <button className="h-[40px] bg-primary rounded-3xl inline-flex items-center px-5 text-white">Xem tất cả</button>
          </div>
        <div className="grid grid-cols-3">
          {mangas && chapters && Object.entries(chapters).map(([mangaId, chapterList], idx) => {
            return <DetailCard key={idx} manga={mangas[mangaId]} chapter={chapterList[0]} />
          })}
        </div>
      </section>
    </div>
  )
}
