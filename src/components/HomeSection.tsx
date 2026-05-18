import Image from "next/image";

type Props = {
  hitokoto: string;
  bgUrl: string;
  bgThumb: string;
};

export default function HomeSection({ hitokoto, bgUrl, bgThumb }: Props) {
  return (
    <section className="page-screen page-screen-home" id="home">
      {bgUrl ? (
        <div className="page-bg" aria-hidden="true">
          <Image
            src={bgUrl}
            alt=""
            fill
            priority
            sizes="100vw"
            placeholder={bgThumb ? "blur" : "empty"}
            blurDataURL={bgThumb || undefined}
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
      ) : null}
      <div className="site-wrapper">
        <div className="site-wrapper-inner">
          <div className="cover-container">
            <div className="inner cover">
              <p className="lead" id="hitokoto">{hitokoto}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
