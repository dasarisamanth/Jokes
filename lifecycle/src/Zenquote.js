import React,{Component} from 'react'
import 'axios'
import Axios from 'axios'


class Zenquote extends Component{
    constructor(props){
        super(props)
        this.state={jokes:[]}
        this.handleScroll=this.handleScroll.bind(this)
        this.getJokes=this.getJokes.bind(this)
        
    };
    componentDidMount(){
        window.addEventListener("scroll", this.handleScroll);
    }
      
       
       
     componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
      }

  async getJokes(){
     
     let jokes=[];

    while(jokes.length<10){
   let res = await Axios.get("https://icanhazdadjoke.com",{headers:{Accept:"application/json"}})
         let j = res.data.joke
         jokes.push(j);
    }
   this.setState({jokes:[...this.state.jokes,...jokes]})
 }
 handleScroll() {
    
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight && this.state.jokes.length<30) {
     
     this.getJokes();
    }
    
  }
render(){
    

    return(
        <div>
        <nav className=" d-flex justify-content-between navbar navbar-expand-lg navbar-dark bg-dark "> 
            <a className="navbar-brand" href="#">DadJokes</a>
            <ul>
            <form className="form-inline my-2 my-lg-0 ">
           <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
           <button  onClick={this.getJokes}className="btn bg-info ">LoadJokes</button>
             </form>  
            </ul>

            </nav>
        <div className="container mt-3 ">
        <div className="row mt-5 justify-content-center">
            {this.state.jokes.map(j=> <div className="card shadow m-2 col-lg-4">{<div className=" card-body text-center bg-light ">{j}</div>
            }</div>)}
                
           
        </div>
        </div>
        </div>
    )
}

}

export default Zenquote;