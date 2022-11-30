import videoHomePage from '../../assets/video.mp4';
const HomePage = (props) => {
  return (
    <div className="homepage-container">
      <video width="450px" height="350px" autoPlay muted loop>
        <source src={videoHomePage} type="video/mp4" />
      </video>

      <div className="homepage-content">
        <div className="title-1">Best study is making group</div>
        <div className="title-2">You don't want to study along. And you need the friend to ask. Create a group and enjoy together.</div>
        <div className="title-3">
          <button>Get's started. It's fun</button>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
