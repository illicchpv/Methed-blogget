
export const getRedditRezArray = (posts) => {
  try {
    if (!posts) return [];
    const a1 = posts.map((el) => el.data);
    const a2 = a1.map((el) => el.children);
    const a3 = a2.filter(el => {
      if (!el.kind) return false;
      return true;
    });
    // const a3 = a2.filter(el => el.kind && el.kind === 't3');
    const a4 = a3.map((el) => el.data);
    return a3;

    /*
    // console.log('List==================postsDat: ', posts);
    const children = posts?.data?.children;
    const childrenData = children.map(el => el.data);
    let tnCnt = 0; // ? ??? warning  'tnCnt' is assigned a value but never used  no-unused-vars

    const postsData = childrenData.map((el, i) => {
      if (el.thumbnail !== 'self') {
        tnCnt++;
        // console.log(JSON.stringify(el, null, 2));
      }
      return {
        thumbnail: (el.thumbnail === 'self' ? '' : el.thumbnail), // el.thumbnail, // ! ??? self
        title: el.title,
        author: el.author,
        ups: el.ups,
        date: el.created,
        id: el.id,
        selftext: el.selftext,
      };
    });
    */
  } catch (e) {
    console.error('getRedditRezArray err: ', e);
    return [];
  }
};
