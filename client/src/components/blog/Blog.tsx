import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { newBlodData } from "../../utils/types";
import { useAppDispatch } from "../app/hooks";
import {
  addBlog,
  getBlogs,
  increaseWatches,
  myBlog,
  get_as_latest,
  get_as_likes,
  get_as_watches,
} from "../../actions/blogAction";
import { useSelector } from "react-redux";
import { RootState } from "../store";

function Blog() {
  const auth = useSelector((state: RootState) => state.auth);
  const blog = useSelector((state: RootState) => state.blog);
  const [show, setshow_modal_XVII] = useState(false);
  const [isMyBlog, set_isMyBlog] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formData, setuserdata] = useState<newBlodData>({
    user: auth.user.id,
    user_name: auth.user.name,
    title: "",
    text: "",
    image_url: "",
    likes: 0,
    watches: 0,
    followers: [],
    created_at: new Date(),
  });

  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/login");
    dispatch(getBlogs());
  }, []);

  const onchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setuserdata({ ...formData, [e.target.name]: e.target.value });
  };

  const create_new_blog = () => {
    setshow_modal_XVII(true);
    setuserdata({
      user: auth.user.id,
      user_name: auth.user.name,
      title: "",
      text: "",
      image_url: "",
      likes: 0,
      watches: 0,
      followers: [],
      created_at: new Date(),
    });
  };

  const latestSort = () => {
    dispatch(get_as_latest());
  };

  const likesSort = () => {
    dispatch(get_as_likes());
  };

  const watchesSort = () => {
    dispatch(get_as_watches());
  };

  const get_my_blogs = () => {
    set_isMyBlog(true);
    dispatch(myBlog(auth.user.id));
  };

  const get_all_blogs = () => {
    set_isMyBlog(false);
    dispatch(getBlogs());
  };

  const onSubmit = () => {
    if (formData.title === "") {
      alert("Title field is requried.");
      return;
    } else if (formData.text === "") {
      alert("Content field is requried.");
      return;
    }
    dispatch(addBlog(formData));
    setshow_modal_XVII(false);
  };

  return (
    <>
      <div className="flex flex-row">
        <div className="w-full max-w-6xl px-4 pt-32 ps-60">
          <div className="border-rounded-lg border pb-6 border-gray-200">
            <div className="flex items-center border-b border-gray-200 justify-between px-6 py-3">
              <p className="text-sm lg:text-xl font-semibold leading-tight text-gray-800">
                Blogs
              </p>
              <div className="flex items-center justify-center px-3 py-2.5 border rounded border-gray-100">
                <p className="text-black-600 text-2xl">Sort: </p>
                <button
                  className="text-2xl md:text-lg leading-none text-black-800 ms-4"
                  onClick={latestSort}
                >
                  Latest
                </button>
                <button
                  className="text-2xl md:text-lg leading-none text-black-800 ms-4"
                  onClick={likesSort}
                >
                  Likes
                </button>
                <button
                  className="text-2xl md:text-lg leading-none text-black-800 ms-4"
                  onClick={watchesSort}
                >
                  Watches
                </button>
              </div>
            </div>
            <div className="px-6 pt-6 overflow-x-auto">
              <table className="w-full whitespace-nowrap">
                <tbody>
                  {blog.blogs.map((item: any, key: Number) => {
                    return (
                      <>
                        <tr className=" border-b border-gray-500">
                          <td className="pt-6 break-words">
                            <div className="flex items-center max-w-screen-sm">
                              <div className="bg-gray-100 rounded-sm p-2.5">
                                <img
                                  src=""
                                  width={48}
                                  height={48}
                                  alt="avata"
                                />
                                <p>{item.user_name}</p>
                              </div>
                              <div className="pl-3 w-52">
                                <Link
                                  to={`/Detail_blog/${item._id}`}
                                  onClick={() => {
                                    if (auth.user.id != item.user)
                                      dispatch(increaseWatches(item._id));
                                  }}
                                >
                                  <p className="font-semibold text-gray-800 text-2xl w-40">
                                    {item.title.slice(0, 35) +
                                      (item.title.length >= 35 ? "..." : "")}
                                  </p>
                                </Link>
                                <p>{item.created_at + ""}</p>
                                <div className="flex flex-row">
                                  <div className="flex flex-row me-4">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke-width="1.5"
                                      stroke="currentColor"
                                      className="w-6 h-6 me-1 text-lg leading-3 text-green-700"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                                      />
                                    </svg>
                                    <p className="text-lg font-semibold leading-none text-right mt-1 text-gray-800">
                                      {item.likes + ""}
                                    </p>
                                  </div>
                                  <div className="flex flex-row">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke-width="1.5"
                                      stroke="currentColor"
                                      className="w-6 h-6 me-1 text-lg leading-3 text-green-700"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                      />
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                      />
                                    </svg>

                                    <p className="text-lg font-semibold leading-none text-right mt-1 text-gray-800">
                                      {item.watches + ""}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className=" pl-56 pt-6">
                            <div className=" ml-48">
                              {isMyBlog && (
                                <div>
                                  <Link to={`/Edit_blog/${item._id}`}>
                                    <button className="mx-2 my-2 bg-white transition duration-150 ease-in-out hover:border-indigo-600 hover:text-indigo-600 rounded border border-indigo-700 text-indigo-700 px-6 py-2 text-xs">
                                      Edit
                                    </button>
                                  </Link>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <div className=" w-54 mt-32 ms-10 p-10 border-blue-100 border">
            <div>
              <button
                onClick={create_new_blog}
                className="mx-2 my-2 bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-3 text-sm"
              >
                New Blog
              </button>
            </div>
            <div>
              <button
                onClick={get_my_blogs}
                className="mx-2 my-2 bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-3 text-sm"
              >
                My Blogs
              </button>
            </div>
            <div>
              <button
                onClick={get_all_blogs}
                className="mx-2 my-2 bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-3 text-sm"
              >
                All Blogs
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${
          show ? "" : "hidden"
        }  py-12 px-4 bg-gray-100 absolute left-0 right-0 top-0 bottom-0`}
      >
        <div
          className={`${
            show ? "" : "hidden"
          } lg:max-w-[842px] md:max-w-[744px] max-w-[375px] w-full mx-auto bg-white lg:px-[109px] md:px-12 px-3 py-20 relative`}
        >
          <div>
            <svg
              onClick={() => setshow_modal_XVII(false)}
              className="cursor-pointer absolute right-4 top-4 z-10"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.28033 6.21967C6.98744 5.92678 6.51256 5.92678 6.21967 6.21967C5.92678 6.51256 5.92678 6.98744 6.21967 7.28033L10.9393 12L6.21967 16.7197C5.92678 17.0126 5.92678 17.4874 6.21967 17.7803C6.51256 18.0732 6.98744 18.0732 7.28033 17.7803L12 13.0607L16.7197 17.7803C17.0126 18.0732 17.4874 18.0732 17.7803 17.7803C18.0732 17.4874 18.0732 17.0126 17.7803 16.7197L13.0607 12L17.7803 7.28033C18.0732 6.98744 18.0732 6.51256 17.7803 6.21967C17.4874 5.92678 17.0126 5.92678 16.7197 6.21967L12 10.9393L7.28033 6.21967Z"
                fill="#373737"
              />
            </svg>
            <div>
              <p className="lg:text-4xl md:text-3xl text-3xl text-center font-semibold text-gray-800">
                Contribute a Impressive Blog.
              </p>
            </div>
            <div className="flex flex-col md:mr-16 mt-8">
              <label
                htmlFor="title"
                className="text-gray-800 dark:text-gray-100  text-3xl leading-tight tracking-normal mb-2"
              >
                Title:
              </label>
              <input
                id="title"
                className="focus:outline-none focus:border focus:border-indigo-700
                 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 bg-white font-normal w-full h-10 
                 flex items-center pl-3 text-lg border-gray-300 rounded border shadow"
                placeholder="input your blog's title."
                name="title"
                value={formData.title}
                onChange={onchange}
              />
            </div>
            <div className="mt-8">
              <label
                htmlFor="content"
                className="text-gray-800 dark:text-gray-100 text-3xl leading-tight tracking-normal mb-2"
              >
                Content:
              </label>
              <textarea
                className="md:w-[643px] w-full md:h-[208px] h-[340px] resize-none focus:outline-none border border-gray-300 px-3 py-3 text-lg"
                placeholder="This is your impressive blog."
                name="text"
                value={formData.text}
                onChange={onchange}
              />
            </div>
            <div className="flex flex-col md:mr-16 mt-3">
              <label className="text-gray-800 dark:text-gray-100  text-3xl leading-tight tracking-normal mb-2">
                Image:
              </label>
              <input
                id="image_url"
                className="focus:outline-none focus:border focus:border-indigo-700
                 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 bg-white font-normal w-full h-10 
                 flex items-center pl-3 text-lg border-gray-300 rounded border shadow"
                placeholder="input URL of a image."
                name="image_url"
                value={formData.image_url}
                onChange={onchange}
              />
            </div>
            <div className="lg:flex justify-center gap-8 text-center lg:mt-6 md:mt-8 mt-8">
              <button
                onClick={onSubmit}
                className="bg-gray-800 hover:bg-gray-700 transition duration-300 ease-out lg:max-w-[187px] w-full text-white py-3 font-medium text-base"
              >
                Submit
              </button>
              <button
                onClick={() => setshow_modal_XVII(false)}
                className="border border-gray-300 hover:bg-gray-50 transition duration-300 ease-out text-gray-600 py-3 lg:max-w-[187px] w-full lg:mt-0 md:mt-4 mt-4"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Blog;
