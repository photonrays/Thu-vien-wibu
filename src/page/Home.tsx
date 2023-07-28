import Slider from "react-slick";
import { Card } from "../components/Card";
import { Card1, Card2, Card3, Card4 } from '../assets/Cards'
import { DetailCard } from "../components/DetailCard";
import { Tag } from "../components/Tag";

type ArrorProps = {
  className?: string,
  style?: React.CSSProperties,
  onClick?: (...args: any[]) => void;
}
function SampleNextArrow({ className, style, onClick }: ArrorProps) {
  const beforeStyle = {
    content: "'Before text'", // Note the single quotes around the text
    fontSize: '16px',
    /* Add other styles as needed */
  };

  return (
    <div
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      className={className + " arrow"}
      style={{ ...style, display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", right: 50, ...beforeStyle }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props: ArrorProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", left: 50, zIndex: 1000 }}
      onClick={onClick}
    />
  );
}

export default function Home() {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    draggable: false,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };
  return (
    <div className="w-full">
      {/*Top manga*/}
      <section className="mb-8">
        <h2 className="text-2xl font-bold">Top 10 sách trong ngày</h2>
        <div className="max-w-full">
          <Slider {...settings}>
            <div>
              <Card ranking={1} image={Card1} bookmarked={false} />
            </div>
            <div>
              <Card ranking={2} image={Card2} bookmarked={true} />
            </div>
            <div>
              <Card ranking={3} image={Card3} bookmarked={true} />
            </div>
            <div>
              <Card ranking={4} image={Card4} bookmarked={true} />
            </div>
            <div>
              <Card ranking={10} image={Card4} bookmarked={true} />
            </div>
            <div>
              <Card ranking={5} image={Card4} bookmarked={true} />
            </div>
            <div>
              <Card ranking={4} image={Card4} bookmarked={true} />
            </div>
            <div>
              <Card ranking={4} image={Card4} bookmarked={true} />
            </div>
            <div>
              <Card ranking={4} image={Card4} bookmarked={true} />
            </div>
          </Slider>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-20 mb-14">
        {/*Continue reading*/}
        <div>
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">Tiếp tục đọc...</h2>
            <button className="h-[40px] bg-[#E75C62] rounded-3xl inline-flex items-center px-5 text-white">Xem tất cả</button>
          </div>
          <div className="bg-[#F0F4FF] w-full mt-5 rounded-3xl">
            <DetailCard image={Card1} title="Wicked like a wild fire" chapter="Chapter 14" description="description" />
            <DetailCard image={Card2} title="RED, WHITE & ROYAL BLUE" chapter="Chapter 4" description="First Son Alex Claremont-Diaz is the closest thing to a prince this side of the Atlantic. With his intrepid sister and the Veep’s genius granddaughter, the..." />
            <DetailCard />
          </div>
        </div>
        {/*Popular tag*/}
        <div className="w-full rounded-3xl">
          <h2 className="text-2xl font-bold mb-3">Khám phá các thể loại nổi tiếng</h2>
          <Tag iconName="ps:gun" name="Action" />
          <Tag iconName="ps:gun" name="Adventure" />
          <Tag iconName="ps:gun" name="Drama" />
          <Tag iconName="ps:gun" name="Horrow" />
          <Tag iconName="ps:gun" name="Ecchi" />
          <Tag iconName="ps:gun" name="Harem" />
          <Tag iconName="ps:gun" name="Fantasy" />
          <Tag iconName="ps:gun" name="Isekai" />
          <Tag iconName="ps:gun" name="Psychology" />
          <Tag iconName="ps:gun" name="Action" />
          <Tag iconName="ps:gun" name="Action" />
          <Tag iconName="ps:gun" name="Action" />
          <Tag iconName="ps:gun" name="Action" />
          <button className="h-[40px] bg-[#E75C62] rounded-3xl inline-flex items-center px-5 text-white m-2 ">Xem tất cả</button>
        </div>
      </section>

      {/* Latest update */}
      <section>
        <h2 className="text-2xl font-bold mb-8">Mới cập nhật</h2>
        <div className="grid grid-cols-6">
          <Card image={Card1} bookmarked={false} detail={{ title: "Summer Bird Blue asdfasd asdfasdf sda", chapter: "Chap 4", time: "38 giây trước" }} />
          <Card image={Card1} bookmarked={false} detail={{ title: "Summer Bird Blue asdfasd asdfasdf sda", chapter: "Chap 4", time: "38 giây trước" }} />
          <Card image={Card1} bookmarked={false} detail={{ title: "Summer Bird Blue asdfasd asdfasdf sda", chapter: "Chap 4", time: "38 giây trước" }} />
          <Card image={Card1} bookmarked={false} detail={{ title: "Summer Bird Blue asdfasd asdfasdf sda", chapter: "Chap 4", time: "38 giây trước" }} />
          <Card image={Card1} bookmarked={false} detail={{ title: "Summer Bird Blue asdfasd asdfasdf sda", chapter: "Chap 4", time: "38 giây trước" }} />
          <Card image={Card1} bookmarked={false} detail={{ title: "Summer Bird Blue asdfasd asdfasdf sda", chapter: "Chap 4", time: "38 giây trước" }} />
          <Card image={Card1} bookmarked={false} detail={{ title: "Summer Bird Blue asdfasd asdfasdf sda", chapter: "Chap 4", time: "38 giây trước" }} />
          <Card image={Card1} bookmarked={false} detail={{ title: "Summer Bird Blue asdfasd asdfasdf sda", chapter: "Chap 4", time: "38 giây trước" }} />
          <Card image={Card1} bookmarked={false} detail={{ title: "Summer Bird Blue asdfasd asdfasdf sda", chapter: "Chap 4", time: "38 giây trước" }} />
          <Card image={Card1} bookmarked={false} detail={{ title: "Summer Bird Blue asdfasd asdfasdf sda", chapter: "Chap 4", time: "38 giây trước" }} />
        </div>
      </section>
    </div>
  )
}
