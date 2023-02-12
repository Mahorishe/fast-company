const Bookmark = ({ user, onBookmark }) => {
  return (
    <button
      className="border border-secondary"
      onClick={() => onBookmark(user._id)}>
      {user.bookmark ? (
        <i class="bi bi-bookmark-heart-fill"></i>
      ) : (
        <i class="bi bi-bookmark"></i>
      )}
    </button>
  );
};

export default Bookmark;
