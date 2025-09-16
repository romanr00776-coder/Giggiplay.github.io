const https = require('https');
const fs = require('fs');

const url = 'https://www.giggiplay.online/feeds/posts/default?alt=json';

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const posts = JSON.parse(data).feed.entry || [];
    if (!fs.existsSync('posts')) fs.mkdirSync('posts');
    posts.forEach((post, i) => {
      const title = post.title.$t.replace(/[\/\\?%*:|"<>]/g, '-');
      const content = post.content.$t;
      fs.writeFileSync(`posts/${title}.html`, content);
    });
  });
});
