import Slider, { Settings } from "react-slick";
import { DetailCard } from "@/components/DetailCard";
import { useEffect, useState, useRef } from 'react';
import * as MangaApi from "@/api/manga";
import { Tag } from '../api/schema';
import { TagItem } from "@/components/TagItem";
import PopularCard from "@/components/PopularCard";
import usePopularNewTitles from "@/hooks/usePopularNewTitles";
import { useManga } from "@/context/useManga";
import { HistoryCard } from "@/components/HistoryCard";
import useReadingHistory from "@/hooks/useReadingHistory";
import useMangaRanking from "@/hooks/useMangaRanking";
import RankingCard from "@/components/RankingCard";
import { Icon } from "@iconify/react";

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

  const { populars, popularLoading } = usePopularNewTitles()
  const { history, removeHistory } = useReadingHistory()
  const { latestUpdates } = useManga()
  const { ranking, rankingLoading } = useMangaRanking(1)

  console.log('re-render')

  useEffect(() => {
    MangaApi.getTag()
      .then((data) => {
        setTag(data.data.slice(0, 14))
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

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
          <Icon className="absolute top-1/2 -translate-y-1/2 left-0 hover:cursor-pointer bg-slate-100 rounded-full" icon="iconamoon:arrow-left-2" onClick={previous} width={40} />
          <Icon className="absolute top-1/2 -translate-y-1/2 right-0 hover:cursor-pointer bg-slate-100 rounded-full" icon="iconamoon:arrow-right-2" onClick={next} width={40} />
        </div>}
      </section>

      {/*Continue reading*/}
      <section className="grid grid-cols-2 lg:grid-cols-3 gap-20 mb-14">
        <div>
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">Tiếp tục đọc...</h2>
            <button className="h-[40px] bg-primary rounded-3xl inline-flex items-center px-5 text-white">Xem tất cả</button>
          </div>
          <div className=" w-full mt-5">
            {Object.entries(history).slice(0,4).map(([mangaId, data], index) => <HistoryCard key={index} id={mangaId} data={data} handleDelete={() => removeHistory(mangaId)} />)}
          </div>
        </div>


        {/*Popular tag*/}
        <div className="w-full rounded-3xl hidden lg:block">
          <h2 className="text-2xl font-bold mb-3">Khám phá các thể loại nổi tiếng</h2>
          {tag?.map((item, idx) => {
            return <TagItem key={idx} item={item} />
          })}
          <button className="h-[40px] bg-primary rounded-3xl inline-flex items-center px-5 text-white m-2 ">Xem tất cả</button>
        </div>

        {/*Popular*/}
        <div>
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">Truyện Top</h2>
          </div>
          {/* <div className="flex my-2">
            <div className="flex-1 w-full bg-red-400 text-center text-white py-1 rounded-md">Top Tuần</div>
            <div className="flex-1 w-full text-center rounded-md">Top Tháng</div>
            <div className="flex-1 w-full text-center rounded-md">Toàn thời gian</div>
          </div> */}
          <div className=" w-full mt-5">
            {rankingLoading ? <div>Loading</div> : ranking?.slice(0,5).map((data, index) => <RankingCard data={data} rank={index} key={index} />)}
          </div>
        </div>
      </section>



      {/* Latest update */}
      <section className="mb-8 w-full">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-8">Mới cập nhật</h2>
          <button className="h-[40px] bg-primary rounded-3xl inline-flex items-center px-5 text-white">Xem tất cả</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {Object.entries(latestUpdates).length < 1 ? <div>Loading</div> : Object.entries(latestUpdates).slice(0, 18).map(([mangaId, {manga, chapterList}]) => {
            return <DetailCard key={mangaId} manga={manga} chapter={chapterList[0]} />
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
