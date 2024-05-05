import Slider, { Settings } from "react-slick";
import { DetailCard } from "@/components/DetailCard";
import { useEffect, useState, useRef } from "react";
import * as MangaApi from "@/api/manga";
import { Tag } from "../api/schema";
import { TagItem } from "@/components/TagItem";
import PopularCard from "@/components/PopularCard";
import usePopularNewTitles from "@/hooks/usePopularNewTitles";
import { HistoryCard } from "@/components/HistoryCard";
import useReadingHistory from "@/hooks/useReadingHistory";
import useMangaRanking from "@/hooks/useMangaRanking";
import RankingCard from "@/components/RankingCard";
import { Icon } from "@iconify/react";
import useLatestChapters from "@/hooks/useLatestChapters";
import { useNavigate } from "react-router-dom";
import useRecentlyAdded from "@/hooks/useRecentlyAdded";
import Card from "@/components/Card";
import isEmpty from "@/utils/isEmpty";

export default function Home() {
  const settings: Settings = {
    dots: false,
    infinite: true,
    lazyLoad: "progressive",
    speed: 500,
    slidesToShow: 1,
    arrows: false,
    autoplay: true,
  };

  const sliderRef = useRef<Slider | null>(null);

  const navigate = useNavigate()

  const next = () => {
    sliderRef.current?.slickNext();
  };

  const previous = () => {
    sliderRef.current?.slickPrev();
  };

  const [tag, setTag] = useState<Tag[]>([]);

  const { data: populars, isLoading: popularsLoading } = usePopularNewTitles();
  const { history, removeHistory } = useReadingHistory();
  const { latestUpdates, latestUpdatesLoading } = useLatestChapters(1)
  const { data: ranking, isLoading: rankingLoading } = useMangaRanking(1);
  const { data: recentlyAdded, isLoading: recentlyAddedLoading } = useRecentlyAdded()

  useEffect(() => {
    MangaApi.getMangaTag()
      .then((data) => {
        setTag(data?.data?.data.slice(0, 14));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="w-full px-8 select-none">
      {/*Top manga*/}
      <section className="mb-8 w-full">
        <h2 className="text-2xl font-bold mb-4">Truyện đề cử</h2>
        {popularsLoading ? (
          <PopularCard />
        ) : (
          <div className="w-full relative">
            <Slider ref={sliderRef} {...settings}>
              {populars && populars?.data?.map((obj, index) => {
                return <PopularCard key={index} data={obj} />;
              })}
            </Slider>
            <Icon
              className="absolute top-1/2 -translate-y-1/2 -translate-x-2 left-0 hover:cursor-pointer bg-slate-100 rounded-full"
              icon="iconamoon:arrow-left-2"
              onClick={previous}
              width={40}
            />
            <Icon
              className="absolute top-1/2 -translate-y-1/2 translate-x-2 right-0 hover:cursor-pointer bg-slate-100 rounded-full"
              icon="iconamoon:arrow-right-2"
              onClick={next}
              width={40}
            />
          </div>
        )}
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20 mb-14">
        {/*Continue reading*/}
        <div className="hidden sm:block">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">Tiếp tục đọc</h2>
            <button
              onClick={() => navigate("/lich-su")}
              className="h-[40px] bg-primary rounded-3xl inline-flex items-center px-5 text-white">
              Xem tất cả
            </button>
          </div>
          <div className=" w-full mt-5">
            {isEmpty(history)
              ? <div className="w-full bg-gray-100 flex items-center justify-center p-5 font-semibold">LỊCH SỬ TRỐNG</div>
              : Object.entries(history)
                .slice(0, 4)
                .map(([mangaId, data], index) => (
                  <HistoryCard
                    key={index}
                    id={mangaId}
                    data={data}
                    handleDelete={() => removeHistory(mangaId)}
                  />
                ))}
          </div>
        </div>

        {/*Popular tag*/}
        <div className="w-full rounded-3xl hidden lg:block">
          <h2 className="text-2xl font-bold mb-3">
            Khám phá các thể loại nổi tiếng
          </h2>
          {tag?.map((item, idx) => {
            return <TagItem key={idx} item={item} />;
          })}
          <button className="h-[40px] bg-primary rounded-3xl inline-flex items-center px-5 text-white m-2 ">
            Xem tất cả
          </button>
        </div>

        {/*Popular*/}
        <div>
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">Truyện Top</h2>
          </div>
          <div className=" w-full mt-5 bg-gray-50 rounded-lg p-5 flex flex-col gap-4">
            {rankingLoading ? (
              <div>Loading</div>
            ) : (
              ranking && ranking?.data.slice(0, 5)
                .map((data, index) => (
                  <RankingCard data={data} rank={index} key={index} />
                ))
            )}
          </div>
        </div>
      </section>

      {/* Latest update */}
      <section className="mb-8 w-full">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-8">Mới cập nhật</h2>
          <button onClick={() => navigate("/moi-cap-nhat")} className="h-[40px] bg-primary rounded-3xl inline-flex items-center px-5 text-white">
            Xem tất cả
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {!latestUpdates && latestUpdatesLoading || Object.entries(latestUpdates).length < 1 ? (
            <div>Loading</div>
          ) : (
            Object.entries(latestUpdates)
              .slice(0, 18)
              .map(([mangaId, { manga, chapterList }]) => {
                return (
                  <DetailCard
                    key={mangaId}
                    manga={manga}
                    chapter={chapterList[0]}
                  />
                );
              })
          )}
        </div>
      </section>

      {/* Recently added */}
      <section>
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-8">Mới thêm gần đây</h2>
          <button onClick={() => navigate('/tim-kiem?order[createdAt]=desc')} className="h-[40px] bg-primary rounded-3xl inline-flex items-center px-5 text-white">
            Xem tất cả
          </button>
        </div>

        {recentlyAddedLoading ? (
          <div>loading</div>
        ) : (
          <div className="w-full relative">
            <Slider slidesToShow={8} slidesToScroll={7} dots={true} draggable={false}>
              {recentlyAdded && recentlyAdded?.data?.map((obj, index) => {
                return <Card key={index} manga={obj} />;
              })}
            </Slider>
          </div>
        )}
      </section>
    </div>
  );
}
