import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { likesSign } from "../../utils/types";
import { useAppDispatch } from "../app/hooks";
import { getSpeciBlog, increaseLikes } from "../../actions/blogAction";
import { RootState } from "../store";
import { useSelector } from "react-redux";

function DetailBlog() {
  const auth = useSelector((state: RootState) => state.auth);
  const blog = useSelector((state: RootState) => state.blog);
  const { data } = useParams<string>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/login");
    if (data !== undefined) dispatch(getSpeciBlog(data));
  }, []);

  const increase_likes = async () => {
    if (blog.detailBlog.user != auth.user.id) {
      let flag = false;
      for (let i = 0; i < blog.detailBlog.followers.length; i++) {
        if (blog.detailBlog.followers[i] === auth.user.id) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        const updateData: likesSign = {
          user_id: auth.user.id,
          blog_id: blog.detailBlog._id,
        };
        await dispatch(increaseLikes(updateData));
        dispatch(getSpeciBlog(blog.detailBlog._id));
      } else alert("You can recommend only once.");
    } else alert("You cannot recommend your own blog.");
  };

  return (
    <>
      <div className=" pt-2">
        <div className="lg:max-w-[842px] md:max-w-[744px] max-w-[375px] w-full mx-auto bg-white lg:px-[109px] md:px-12 px-3 py-10 relative">
          <div>
            <p className="lg:text-4xl md:text-3xl text-3xl text-center font-semibold text-gray-800">
              {blog.detailBlog.title}
            </p>
          </div>
          <div className=" mt-10">
            <div className="flex flex-row">
              <div className="bg-gray-500 dark:bg-gray-800 h-6 w-16 mb-4 md:mb-0 rounded-full flex items-center justify-center me-3">
                <span className="text-xs text-white font-normal">Writer</span>
              </div>
              <p className="">{blog.detailBlog.user_name}</p>
            </div>
            <div className="flex flex-row mt-2">
              <div className="bg-gray-500 dark:bg-gray-800 h-6 w-16 mb-4 md:mb-0 rounded-full flex items-center justify-center me-3">
                <span className="text-xs text-white font-normal">Date</span>
              </div>
              <p className="">{blog.detailBlog.created_at}</p>
            </div>
            <div className="flex flex-row mt-2">
              <div className="bg-gray-500 dark:bg-gray-800 h-6 w-16 mb-4 md:mb-0 rounded-full flex items-center justify-center me-3">
                <span className="text-xs text-white font-normal">Likes</span>
              </div>
              <p className="me-2">{blog.detailBlog.likes}</p>
              <button title="Up" onClick={increase_likes}>
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
              </button>
            </div>
            <div className="flex flex-row mt-2">
              <div className="bg-gray-500 dark:bg-gray-800 h-6 w-16 mb-4 md:mb-0 rounded-full flex items-center justify-center me-3">
                <span className="text-xs text-white font-normal">Watches</span>
              </div>
              <p className="">{blog.detailBlog.watches}</p>
            </div>
          </div>
          <div className="flex flex-col md:mr-16 mt-8">
            <label className="text-gray-800 dark:text-gray-100  text-3xl leading-tight tracking-normal mb-2">
              Image:
            </label>
            <input
              id="image_url"
              className="disabled focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 bg-white font-normal w-full h-10 
              flex items-center pl-3 text-lg border-gray-300 rounded border shadow"
              placeholder="There is no URL of a image."
              name="image_url"
              disabled={true}
              value={blog.detailBlog.image_url}
            />
          </div>
          <div className="mt-3">
            <label
              htmlFor="content"
              className="text-gray-800 dark:text-gray-100 text-3xl leading-tight tracking-normal mb-2"
            >
              Content:
            </label>
            <textarea
              className=" md:w-[643px] w-full md:h-[208px] h-[340px] resize-none focus:outline-none border border-gray-300 px-3 py-3 text-lg"
              placeholder="This is your impressive blog."
              readOnly={true}
              name="text"
              value={blog.detailBlog.text}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailBlog;
