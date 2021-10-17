import Link from 'next/link';
import Layout from 'components/Layout';
import InlineSelect, { Option } from 'components/InlineSelect';
import React, { useState } from 'react';
import Feed from 'components/Feed';

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

      <Feed/>

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
