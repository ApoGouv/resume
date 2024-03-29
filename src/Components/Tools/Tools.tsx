import { useState, useEffect } from 'react';
import './Tools.css';

type ToolsType = {
  isHidden: boolean;
  sectionTitle: string;
  entries: string[];
};

export type ToolsProp = {
  data: ToolsType;
};

function Tools({ data }: ToolsProp) {
  const [toolsState, setToolsState] = useState(data);

  useEffect(() => {
    setToolsState({ ...data });
  }, [data]);

  return (
    <section className="tools__section" id="tools">
      <h2 className="interests__heading section-title">
        {toolsState.sectionTitle}
      </h2>
      <div className="tools__entries">{toolsState.entries.join(', ')}</div>
    </section>
  );
}

export default Tools;
