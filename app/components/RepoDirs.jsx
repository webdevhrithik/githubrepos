import Link from 'next/link';

const fetchDirs = async name => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const res = await fetch(
    `https://api.github.com/repos/webdevhrithik/${name}/contents`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  const contents = await res.json();

  return contents;
};

const RepoDirs = async ({ name }) => {
  const contents = await fetchDirs(name);

  const dirs = contents.filter(content => content.type === 'dir');

  return (
    <>
      <h3>Directories</h3>
      <ul>
        {dirs.map(dir => (
          <li key={dir.path}>
            <Link href={`/code/repos/${name}/${dir.path}`}>{dir.path}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default RepoDirs;
