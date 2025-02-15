interface TemplateNavProps {
    activeTab : string ; 
     onTabChange  : (tab : string)=>void ;
}

const TemplateNav = ({ activeTab, onTabChange } : TemplateNavProps) => {
    const tabs = ['Web', 'Facebook', 'WhatsApp', 'SMS', 'Instagram', 'API'];
  
    return (
      <nav>
        <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
          {tabs.map((tab) => (
            <li key={tab} style={{ margin: '0 10px' }}>
              <button
                style={{
                  fontWeight: activeTab === tab ? 'bold' : 'normal',
                  color: activeTab === tab ? 'blue' : 'black',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onClick={() => onTabChange(tab)}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
        
      </nav>
    );
  };
  
  export default TemplateNav;