type Props = {
  hitokoto: string;
  bgUrl: string;
};

export default function HomeSection({ hitokoto, bgUrl }: Props) {
  return (
    <section
      className="page-screen page-screen-home"
      id="home"
      style={bgUrl ? { backgroundImage: `url(${bgUrl})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
    >
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
