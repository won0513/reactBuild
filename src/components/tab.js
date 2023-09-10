import { useState } from "react";
import {Nav} from 'react-bootstrap';

function TabContent(props){
    let cList2 = props.tabContList[props.tab]
    return <p>{cList2.map((c)=>{return (<p>{c}</p>)})}</p>
}

export default function Tab({tabList, tabContList}) {
    let [tab, setTab] = useState(0);
  return (
    <div><Nav className="mt-5 mb-3" variant="tabs" defaultActiveKey="link-0">
        {tabList.map((t, idx)=> {
            let k = "link-" + idx;
            return (    
            <Nav.Item>
            <Nav.Link eventKey={k} onClick={()=>{setTab(idx)}}>{t}</Nav.Link>
            </Nav.Item>
            )
        }
        )}
  </Nav>
    <TabContent tab={tab} tabContList={tabContList}/>
    </div>
  )
}