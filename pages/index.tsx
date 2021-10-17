import Link from 'next/link';
import Layout from 'components/Layout';
import InlineSelect, { Option } from 'components/InlineSelect';
import { useState } from 'react';

export default function Home() {
  const fellowships = ['Founders', 'Writers', 'Angels'];
  const [selectedFellowship, setSelectedFellowship] = useState<string>();

  return (
    <Layout>
      <InlineSelect
        label="Choose a fellowship"
        onSelectedChange={(option) => {
          setSelectedFellowship(option);
        }}
      >
        {fellowships.map((fellowship) => (
          <Option key={fellowship} value={fellowship} isSelected={selectedFellowship === fellowship}></Option>
        ))}
      </InlineSelect>

      <h1>Hello Hello there!</h1>
      <p>Your future newsfeed goes to this page. Or not, you decide 🤷</p>
      <span>Check out these pages:</span>
      <ul>
        <li>
          Project <Link href="/projects/10">Blue Onion Labs</Link>
        </li>
        <li>
          User <Link href="/users/11">Cai Burris</Link>
        </li>
      </ul>
    </Layout>
  );
}
