function RatingCirle(props) {
  const { rating } = props;

  const getColor = () => {
    let rate = rating || 0;
    if (rate < 4) {
      return '#3aa265';
    } if (rate >= 4 && rate < 6) {
      return '#80dd29';
    } if (rate >= 6 && rate < 8) {
      return '#ffe234';
    } if (rate >= 8) {
      return '#3aa265';
    }
  }

  const getStyle = () => {
    return {
      color: getColor(),
      background: `conic-gradient(${getColor()} ${rating * 10}%, transparent 0 100%)`
    }
  }

  return (
    <div className={'rating'}
      style={getStyle()}>
      <span>{rating}</span>
    </div>
  );
}

export default RatingCirle;