const Hero = () => {
  return (
    <div
      className="p-10 lg:px-20 bg-[url('wick.jpg')] 
    bg-center bg-cover text-white"
    >
      <h1 className="text-4xl md:text-5xl font-bold">Welcome to Moviesss</h1>
      <h2 className="text-2xl md:text-3xl font-semibold">
        Discover millions Movie, Series, and Actors
      </h2>

      <div className="relative rounded-full flex mt-5 overflow-hidden">
        <input
          className="w-full p-2 px-4 text-black"
          type="text"
          placeholder="Search Movie, Series, Actor..."
        />
        <button
          className="absolute end-0 bg-blue-400 h-full w-20 
        text-white font-semibold hover:bg-blue-500 
        transition"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Hero;
