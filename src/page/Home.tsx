import Slider, { Settings } from "react-slick";
import { Card } from "@/components/Card";
import { DetailCard } from "@/components/DetailCard";
import { useEffect, useState, useRef } from 'react';
import * as MangaApi from "@/api/manga";
import { Tag } from '../api/schema';
import Iconify from "@/components/Iconify";
import { TagItem } from "@/components/TagItem";
import { ExtendChapter, ExtendManga } from "@/api/extend";
import { getLatestChapter } from "@/api/chapter";
import PopularCard from "@/components/PopularCard";
import usePopularNewTitles from "@/hooks/usePopularNewTitles";

export default function Home() {
  const settings: Settings = {
    dots: false,
    infinite: true,
    lazyLoad: "progressive",
    speed: 500,
    draggable: false,
    slidesToShow: 1,
    arrows: false
  };

  const sliderRef = useRef<Slider | null>(null);

  const next = () => {
    sliderRef.current?.slickNext();
  };

  const previous = () => {
    sliderRef.current?.slickPrev();
  };

  const [tag, setTag] = useState<Tag[]>();
  const [latestChapters, setLatestChapters] = useState<ExtendChapter[]>()
  const [mangas, setMangas] = useState<Record<string, ExtendManga>>()
  const [chapters, setChapters] = useState<Record<string, ExtendChapter[]>>()
  const {populars, popularLoading} = usePopularNewTitles()

  useEffect(() => {
    MangaApi.getTag()
      .then((data) => {
        setTag(data.data.slice(0, 30))
      })
      .catch((err) => {
        console.log(err);
      });

    getLatestChapter(1)
      .then(data => setLatestChapters(data))
      .catch((err) => {
        console.log(err);
      });
  }, [])

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
    }
  }, [latestChapters])

  useEffect(() => {
    if (chapters) {
      MangaApi.getMangasByIds(Object.keys(chapters))
        .then(data => { setMangas(data) })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [chapters])

  return (
    <div className="w-full px-8 select-none">
      {/*Top manga*/}
      <section className="mb-8 w-full">
        <h2 className="text-2xl font-bold mb-4">Truyện đề cử</h2>
        {popularLoading ? <PopularCard /> : <div className="w-full relative">
          <Slider ref={sliderRef} {...settings}>
            {populars?.map((obj, index) => {
              return <PopularCard key={index} data={obj} />
            })}
          </Slider>
          <Iconify className="absolute top-1/2 -translate-y-1/2 left-0 hover:cursor-pointer bg-slate-100 rounded-full" icon="iconamoon:arrow-left-2" onClick={previous} width={40} />
          <Iconify className="absolute top-1/2 -translate-y-1/2 right-0 hover:cursor-pointer bg-slate-100 rounded-full" icon="iconamoon:arrow-right-2" onClick={next} width={40} />
        </div>}
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
      <section className="mb-8 w-full">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-8">Mới cập nhật</h2>
          <button className="h-[40px] bg-primary rounded-3xl inline-flex items-center px-5 text-white">Xem tất cả</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {mangas && chapters && Object.entries(chapters).slice(0, 18).map(([mangaId, chapterList], idx) => {
            return <DetailCard key={idx} manga={mangas[mangaId]} chapter={chapterList[0]} />
          })}
        </div>
      </section>

      {/* Recently added */}
      <section>
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-8">Mới thêm gần đây</h2>
          <button className="h-[40px] bg-primary rounded-3xl inline-flex items-center px-5 text-white">Xem tất cả</button>
        </div>

      </section>
    </div>
  )
}
