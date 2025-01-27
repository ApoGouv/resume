import '@/Components/Tools/Tools.css';

type ToolsType = {
  isHidden: boolean;
  sectionTitle: string;
  entries: string[];
};

export type ToolsProp = {
  toolsData: ToolsType;
};

function Tools({ toolsData }: ToolsProp) {
  // Guard to avoid rendering unnecessary markup.
  if (toolsData.isHidden) return null;

  return (
    <section className="tools__section" id="tools">
      <h2 className="interests__heading section-title">
        {toolsData.sectionTitle}
      </h2>
      {/* <div className="tools__entries">{toolsData.entries.join(', ')}</div> */}
      <ul className="tools__entries">
        {toolsData.entries.map((tool, index) => (
          <li key={`tool-${index}`} className="tools__entry">
            {tool}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Tools;
