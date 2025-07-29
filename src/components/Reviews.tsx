import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Loader } from "react-feather";
import { useTranslations } from "next-intl";
import { IComments } from "@/types";
import { useGetuserInformationQuery } from "@/lib/Redux/features/User/userApi";
import { useAddCommentsMutation } from "@/lib/Redux/features/Comments/CommentsApi";
import { useDeleteCommentsMutation } from "@/lib/Redux/features/Courses/CoursesApi";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "./AuthContext";

interface ReviewsProps {
  comments: IComments[];
  course_id: number;
}

export const Reviews = ({ comments, course_id }: ReviewsProps) => {
  const t = useTranslations("translation");
  const { token } = useAuth() || "";

  const shouldFetch = Boolean(token); // ما نعمل query إلا إذا التوكن موجود
  const [comment, setComment] = useState<string>("");
  const [showAllComments, setShowAllComments] = useState(false);
  const { data: user } = useGetuserInformationQuery(token as string, {
    skip: !shouldFetch,
  });

  const [addComments, { isLoading: isloadingAddComment }] =
    useAddCommentsMutation();
  const [deleteComments, { isLoading: isloadingDeleteComment }] =
    useDeleteCommentsMutation();

  const displayedComments = showAllComments ? comments : comments.slice(0, 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) return;

    try {
      await addComments({
        comment_text: comment,
        token,
        course_id,
      }).unwrap();

      toast.success(t("message.comments.add"));
      setComment("");
    } catch (err) {
      toast.error(t("message.comments.error"));
      console.error(err);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComments({
        comment_id: commentId,
        token,
      }).unwrap();
      toast.success(t("message.comments.delete"));
    } catch (err) {
      toast.error(t("message.comments.error_delete"));
      console.error(err);
    }
  };
  return (
    <>
      <div className="p-4 border-b border-gray-200">
        <Toaster
          toastOptions={{
            className: "",
            duration: 3000,
            removeDelay: 1000,
            style: {
              fontSize: "14px",
            },
          }}
        />
        {displayedComments.length > 1 && (
          <div className="flex justify-center mb-4">
            <button
              aria-label={
                showAllComments
                  ? t("Courses_card.showless")
                  : t("Courses_card.showAll")
              }
              title={
                showAllComments
                  ? t("Courses_card.showless")
                  : t("Courses_card.showAll")
              }
              onClick={() => setShowAllComments(!showAllComments)}
              className="text-primary hover:text-primary/50 font-medium text-xs sm:text-sm"
            >
              {showAllComments
                ? t("Courses_card.showless")
                : t("Courses_card.showAll")}
            </button>
          </div>
        )}

        {displayedComments.length === 0 && (
          <div className="flex justify-center text-sm text-neutral-500/50 ">
            <span>{t("Courses_card.noComment")}</span>
          </div>
        )}
        <div className="space-y-4">
          {displayedComments.map((comment: IComments) => (
            <div key={comment.id} className="flex space-x-4">
              <div className="h-10 w-10  rounded-full">
                <Image
                  fill
                  quality={90}
                  priority
                  className=" object-contain "
                  src={comment.avatar}
                  alt={`${comment.author}'s avatar`}
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm md:text-base font-medium text-gray-900">
                    {comment.author}
                  </p>
                  <div className="flex gap-2 items-center">
                    <p className="text-xs sm:text-sm text-gray-500">
                      {/* {getTimeAgo(comment.time)} */}
                    </p>

                    {comment?.user_id === user?.user.id && (
                      <button
                        type="button"
                        aria-label="حذف"
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-red-500 text-xs hover:underline"
                        disabled={isloadingDeleteComment}
                      >
                        {isloadingDeleteComment ? "..." : "حذف"}
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                  {comment.comment_text}
                </p>
              </div>
            </div>
          ))}
        </div>
        {token && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm text-gray-900 mb-4">
              {t("Courses_card.add_comments")}
            </h3>
            <div className="flex space-x-4">
              {/* من معلومات اليوزر  */}
              <div className="relative h-10 w-10  rounded-full">
                <Image
                  fill
                  quality={90}
                  priority
                  className=" object-contain "
                  src={user?.user.image} // Placeholder for current user's avatar
                  alt="Your avatar"
                />
              </div>
              <form onSubmit={handleSubmit} className="flex-1">
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary/50 resize-y placeholder:text-[10px] placeholder:sm:text-xs placeholder:font-light placeholder:text-neutral-400"
                  rows={3}
                  placeholder={t("Courses_card.comments_placeholder")}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  maxLength={200} // مثلاً كل سطر 100 حرف → سطرين = 200 حرف
                  style={{ resize: "none" }} // يمنع المستخدم من التوسعة
                />

                <button
                  disabled={!comment.trim()}
                  type="submit"
                  aria-label={t("Courses_card.send")}
                  title={t("Courses_card.send")}
                  className={`mt-3 float-right  w-full text-white text-sm py-2 px-6 rounded-md hover:bg-primary/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 ${
                    !comment.trim()
                      ? "bg-primary/70 cursor-not-allowed"
                      : "bg-primary cursor-pointer "
                  }`}
                >
                  {isloadingAddComment ? (
                    <span className="flex justify-center">
                      <Loader
                        size={20}
                        className="animate-spin animate-duration-[1500ms]"
                      />
                    </span>
                  ) : (
                    t("Courses_card.send")
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      {!token && (
        <div className="w-full mt-8  flex justify-between gap-0 items-center">
          <p className="text-sm sm:text-base ">سجل الآن وشاركنا رأيك 😍</p>
          <Link
            href={"/login"}
            className="  text-primary  text-sm sm:text-base  text-center rounded-md hover:text-primary/80 "
          >
            {t("Header.login")}
          </Link>
        </div>
      )}
    </>
  );
};
