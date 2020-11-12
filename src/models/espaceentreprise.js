import React from 'react';
import CreanEntreprise from './crea_entreprise_form'
import ReactMarkdown from 'react-markdown/with-html'
import { Reveal, Tween } from 'react-gsap';

const Espace_entreprise = (props) => {

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
  <div className="col-sm-12 ">
  {item.image.map((img,key)=> (
  <Reveal key={key} repeat trigger={<div />}>
  <FadeInLeft>
    <br/>
  <h4>{img.caption}</h4>
  <br/>
  <img alt="img" className="rounded humbnail justify-content-center" src={img.url}/>
  <br/>
  </FadeInLeft>
</Reveal>
  
  ))}
  </div>
<div className="col-sm-10 alert-primary card">
<ReactMarkdown
 source={item.descrtiption}
 escapeHtml={false}
/> 
  </div>

 </div>
  )
    return ( 
        <div>

{props.user.logged?
  <div className="jumbotron jumbotron-fluid">
  <div className="container">
<h1 className="tag bg-info">Espace Entreprise </h1>
    <p>Utilisateur :  {props.user.username}</p>
    {props.user.r_entreprise===props.user.role? 
    "oui"
    :
    <CreanEntreprise user={props.user}/>}
  
  </div>
</div>:
<div className="container-fluid">
  <div className="row">
    <h1>      Espace Entreprise</h1>

    {blocktext}
  </div>
</div>
}
        </div>
     );
}
 
export default Espace_entreprise;