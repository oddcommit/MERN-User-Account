import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateBlodData } from "../../utils/types";
import { useAppDispatch } from "../app/hooks";
import { updateBlog } from "../../actions/blogAction";
import { RootState } from "../store";
import { useSelector } from "react-redux";

function DetailBlog() {
  const auth = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/login");
  }, []);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const blog = useSelector((state: RootState) => state.blog);
  const { data } = useParams<string>();

  const [formData, setuserdata] = useState<updateBlodData>({
    blog_id: blog.detailBlog._id,
    title: blog.detailBlog.title,
    text: blog.detailBlog.text,
    image_url: blog.detailBlog.image_url,
  });

  if (formData.blog_id === undefined)
    for (let i = 0; i < blog.blogs.length; i++) {
      if (blog.blogs[i]._id === data) {
        setuserdata({
          ...formData,
          blog_id: blog.blogs[i]._id,
          title: blog.blogs[i].title,
          text: blog.blogs[i].text,
          image_url: blog.blogs[i].image_url,
        });
        break;
      }
    }

  const onchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setuserdata({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    if (formData.title === "") {
      alert("Title field is requried.");
      return;
    } else if (formData.text === "") {
      alert("Content field is requried.");
      return;
    }
    dispatch(updateBlog(formData));
    alert("update successfuly");
    navigate("/blog");
  };

  return (
    <>
      <div className=" pt-2">
        <div className="lg:max-w-[842px] md:max-w-[744px] max-w-[375px] w-full mx-auto bg-white lg:px-[109px] md:px-12 px-3 py-10 relative">
          <div className="text-5xl border-b-2 font-normal w-full pb-2">
            Edit
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
              className="focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 bg-white font-normal w-full h-10 
              flex items-center pl-3 text-lg border-gray-300 rounded border shadow"
              placeholder="input URL of a image."
              name="image_url"
              value={formData.image_url}
              onChange={onchange}
            />
          </div>
        </div>
        <div className="lg:flex justify-center gap-8 text-center lg:mt-6 md:mt-8 mt-8">
          <button
            onClick={onSubmit}
            className="bg-gray-800 hover:bg-gray-700 transition duration-300 ease-out lg:max-w-[187px] w-full text-white py-3 font-medium text-base"
          >
            Submit
          </button>
          <button
            onClick={() => navigate("/blog")}
            className="border border-gray-300 hover:bg-gray-50 transition duration-300 ease-out text-gray-600 py-3 lg:max-w-[187px] w-full lg:mt-0 md:mt-4 mt-4"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default DetailBlog;
