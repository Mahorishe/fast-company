const Qualitie = ({ qualities }) => {
  return qualities.map((quality) => {
    const bgColor = `badge bg-${quality.color} m-1`;
    return (
      <span key={quality._id} className={bgColor}>
        {quality.name}
      </span>
    );
  });
};

export default Qualitie;
