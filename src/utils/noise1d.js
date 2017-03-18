const simpleNoise1D = () => {
  const MAX_VERTICES = 256;
  const MAX_VERTICES_MASK = MAX_VERTICES - 1;
  let amplitude = 1;
  let scale = 1;

  const r = [];

  for (let i = 0; i < MAX_VERTICES; ++i) {
    r.push(Math.random() * 2 - 1);
  }

  const getVal = x => {
    const scaledX = x * scale;
    const xFloor = Math.floor(scaledX);
    const t = scaledX - xFloor;
    const tRemapSmoothstep = t * t * (3 - 2 * t);

        // / Modulo using &
    const xMin = xFloor & MAX_VERTICES_MASK;
    const xMax = (xMin + 1) & MAX_VERTICES_MASK;

    const y = lerp(r[xMin], r[xMax], tRemapSmoothstep);

    return y * amplitude;
  };

    /**
    * Linear interpolation function.
    * @param a The lower integer value
    * @param b The upper integer value
    * @param t The value between the two
    * @returns {number}
    */
  const lerp = (a, b, t) => (
    a * (1 - t) + b * t
  );

    // return the API
  return {
    getVal,
    setAmplitude: newAmplitude => {
      amplitude = newAmplitude;
    },
    setScale: newScale => {
      scale = newScale;
    },
  };
};

export default simpleNoise1D;
