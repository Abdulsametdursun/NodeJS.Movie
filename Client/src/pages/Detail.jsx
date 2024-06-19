import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { FaTrash, FaStar } from "react-icons/fa6";
import { MdFavorite } from "react-icons/md";
import { FaBookmark } from "react-icons/fa";
import { BiSolidCameraMovie } from "react-icons/bi";
import { getRatingColor } from "../utils/color";

const Detail = () => {
  const navigate = useNavigate();
  // 1) Get the movie id from the url
  const { id } = useParams();

  // 2) Get the movie from the API
  const { data, error, isLoading } = useQuery({
    queryKey: ["movie"],
    queryFn: () => api.get(`/movies/${id}`),
  });

  const movie = data?.data;
  const { background: color, text: textColor } = getRatingColor(movie?.rating);

  const handleDelete = () => {
    api
      .delete(`/movies/${movie.id}`)
      .then((res) => navigate("/"))
      .catch((err) => console.log("error", err));
  };

  return (
    <div className="p-10">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        data && (
          <>
            <div>
              <div className="flex justify-end">
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white p-2 rounded-md hover:bg-red-400"
                >
                  <FaTrash />
                </button>
              </div>

              <div className="flex flex-col gap-10 items-center md:flex-row">
                <div>
                  <img
                    className="rounded"
                    src="https://picsum.photos/250/400"
                    alt="poster"
                  />
                </div>

                <div className="flex flex-col gap-10">
                  <h1 className="text-3xl font-semibold">
                    {movie.title} <span>({movie.year})</span>
                  </h1>

                  <p>
                    <span className="font-semibold me-3">IMDB: </span>
                    <span
                      className="p-2 rounded-full font-semibold"
                      style={{ background: color, color: textColor }}
                    >
                      {movie.rating}
                    </span>
                  </p>

                  <div className="flex gap-5">
                    <button className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700">
                      <MdFavorite />
                    </button>
                    <button className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700">
                      <FaBookmark />
                    </button>
                    <button className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700">
                      <FaStar />
                    </button>
                    <button className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700">
                      <BiSolidCameraMovie />
                    </button>
                  </div>

                  <div className="flex gap-5 items-center">
                    <p className="font-semibold">Categories</p>
                    <p className="flex gap-3">
                      {movie.genre.map((genre) => (
                        <span className="bg-yellow-600 py-1 px-3 rounded-full text-white">
                          {genre}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default Detail;
