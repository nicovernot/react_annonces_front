import React from 'react'
import ReactMarkdown from 'react-markdown/with-html'
import { Reveal, Tween } from 'react-gsap';

const Home = (props) => {
  const FadeInLeft = ({ children }) => (
    <Tween
      from={{ opacity: 0, transform: 'translate3d(+100vw, 0, 0)' }}
      ease="back.out(1.4)"
    >
      {children}
    </Tween>
  );
  let bl = []
  for (const [key, value] of Object.entries(props.menu)) {
    bl = value.blocktexts
    console.log(key)
  }
  const blorder = bl.sort((a, b) => {return a.ordre - b.ordre })

  const blocktext = blorder.map((item,key) =>
  <div key={key} className={item.className}>
<br/>
<br/>
<Reveal repeat>
  <Tween from={{ opacity: 0 }} duration={2}>
<h3 className="col-sm-12 bg-light">{item.title}</h3>
<br/>
<br/>
  </Tween>
</Reveal>
<div className="col-sm-6 alert-primary card">
<ReactMarkdown
 source={item.descrtiption}
 escapeHtml={false}
/> 
  </div>
  <div className="col-sm-4 ">
  {item.image.map((img,key)=> (
  <Reveal key={key} repeat trigger={<div />}>
  <FadeInLeft>
    <br/>
  <h4>{img.caption}</h4>
  <br/>
  <img alt="img" className="rounded-circle mx-auto d-block" src={img.url}/>
  <br/>
  </FadeInLeft>
</Reveal>
  
  ))}
  </div>

 </div>
  )

    return (
    <div>
  

        {blocktext}
  
    </div>
      );
}
 
export default Home;
