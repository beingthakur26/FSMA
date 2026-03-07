import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncLoadpeople, removepeople } from '../store/actions/peopleActions'
import { Link, useParams, useNavigate } from 'react-router-dom'
import noimage from '/noimage.jpg'

const PeopleDetail = () => {
  const { info } = useSelector((state) => state.people)
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncLoadpeople(id))
    return () => dispatch(removepeople())
  }, [id])

  if (!info) {
    return <h1 className="text-2xl p-4 text-white w-full h-screen">Loading...</h1>
  }

  const { detail, external_id, combined_credits, images } = info

  return (
    <div className="pb-10 w-screen text-white px-[3%] py-[0.5%] bg-[#0D0D0F]">

      {/* 🔹 Navigation */}
      <nav className="w-full flex items-center justify-between text-2xl mb-6">
        <i
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line text-4xl text-zinc-300 hover:text-[#6556CD] cursor-pointer"
        ></i>

        <div className="flex items-center gap-5 text-2xl">
          {detail.homepage && (
            <a
              href={detail.homepage}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#6556CD]"
            >
              <i className="ri-home-5-line"></i>
            </a>
          )}
          {external_id?.wikidata_id && (
            <a
              href={`https://www.wikidata.org/wiki/${external_id.wikidata_id}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#6556CD]"
            >
              <i className="ri-global-line"></i>
            </a>
          )}
          {external_id?.imdb_id && (
            <a
              href={`https://www.imdb.com/name/${external_id.imdb_id}`}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
                alt="IMDb"
                className="w-[55px] h-[25px] object-contain bg-[#F5C518] rounded-sm"
              />
            </a>
          )}
        </div>
      </nav>

      {/* 🔹 Person Info */}
      <div className="pb-3">
        <h1 className="text-5xl text-zinc-100 font-black">{detail.name}</h1>
        <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-zinc-300 mt-2">
          <span>{detail.known_for_department || 'N/A'}</span>
          {detail.birthday && (
            <>
              <span>•</span>
              <span>Born: {detail.birthday}</span>
            </>
          )}
          {detail.deathday && (
            <>
              <span>•</span>
              <span>Died: {detail.deathday}</span>
            </>
          )}
          {detail.place_of_birth && (
            <>
              <span>•</span>
              <span>{detail.place_of_birth}</span>
            </>
          )}
        </div>
      </div>

      {/* 🔹 Profile + Biography */}
      <div className="flex w-full gap-6 pb-6 flex-wrap md:flex-nowrap">
        <div className=" rounded-lg overflow-hidden h-[60vh] bg-zinc-900">
          <img
            src={
              detail.profile_path
                ? `https://image.tmdb.org/t/p/w500/${detail.profile_path}`
                : noimage
            }
            alt={detail.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col w-full md:w-[60vw]">
          <h2 className="text-2xl font-semibold mb-2 text-zinc-200">
            Biography
          </h2>
          <p className="text-zinc-300 text-base leading-relaxed font-medium max-h-[45vh] overflow-y-auto pr-2">
            {detail.biography?.trim() || 'No biography available.'}
          </p>

          {/* 🔹 Extra Details (shown if biography has space below) */}
          <div className="mt-4 text-sm text-zinc-400 space-y-1">
            <p><span className="text-zinc-200 font-semibold">Popularity:</span> {detail.popularity?.toFixed(1)}</p>
            <p><span className="text-zinc-200 font-semibold">Gender:</span> {detail.gender === 2 ? 'Male' : detail.gender === 1 ? 'Female' : 'Other'}</p>
            <p><span className="text-zinc-200 font-semibold">Known For:</span> {detail.known_for_department}</p>
          </div>
        </div>
      </div>

      {/* 🔹 Photos */}
      {images?.length > 0 && (
        <div className="mt-8">
          <h1 className="text-3xl font-bold text-zinc-100 mb-4">Photos</h1>
          <div className="flex flex-wrap gap-4 justify-start">
            {images.slice(0, 12).map((img, i) => (
              <img
                key={i}
                src={`https://image.tmdb.org/t/p/w500/${img.file_path}`}
                alt="Profile"
                className="w-[18vh] h-[25vh] object-cover rounded-md hover:scale-105 transition-transform duration-300"
              />
            ))}
          </div>
        </div>
      )}

      {/* 🔹 Known For Section */}
      {combined_credits?.cast?.length > 0 && (
        <div className="mt-10 pb-10">
          <h1 className="text-3xl font-bold text-zinc-100 mb-4">Known For</h1>
          <div className="w-full p-4 flex justify-start flex-wrap gap-8 rounded-md">
            {combined_credits.cast
              .filter((p) => p.poster_path)
              .slice(0, 20)
              .map((project, index) => (
                <Link
                  to={
                    project.media_type === 'movie'
                      ? `/movie/details/${project.id}`
                      : `/tv/details/${project.id}`
                  }
                  key={index}
                  className="w-[23vh] rounded-lg flex flex-col hover:scale-105 transition-transform duration-300 cursor-pointer h-[38vh]"
                >
                  <div className="w-full rounded-lg overflow-hidden h-[31vh]">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${project.poster_path}`}
                      alt={project.title || project.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h1 className="text-lg text-zinc-200 font-semibold mt-2 hover:text-[#6556CD] truncate">
                    {project.title || project.name}
                  </h1>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PeopleDetail
