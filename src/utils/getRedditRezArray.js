
export const getRedditRezArray = (posts) => {
  try {
    debugger;
    if (!posts) return [];
    const a1 = posts.map((el) => el.data);
    const a2 = a1.map((el) => el.children);
    const a3 = a2.filter(el => {
      if (!el.kind) return false;
      return true;
    });
    // const a3 = a2.filter(el => el.kind && el.kind === 't3');
    const a4 = a3.map((el) => el.data);
    return a4;
  } catch (e) {
    console.error('getRedditRezArray err: ', e);
    return [];
  }
};
