import { useNavigate } from "react-router-dom";
import useTitle from "../utilities/useTitle";
import PropTypes from "prop-types";

export default function UpcomingModule({ title }) {
  useTitle("Error");
  const navigate = useNavigate();

  return (
    <>
      <main className="grid place-items-center px-6 py-12 lg:px-8">
        <div className="text-center w-3/4 md:w-1/2 mx-auto">
          <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-4xl">
            <span className="text-gradient">{title}</span> is not available right now
          </h1>

          <p className="mt-6 text-base leading-7">
            {title} you’re looking for is currently not available, we are
            working on it & will be accessible in a very short while. Please try
            again later
          </p>

          {/* back BTN */}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={() => navigate(-1)}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

UpcomingModule.propTypes = {
  title: PropTypes.PropTypes.string.isRequired,
};
