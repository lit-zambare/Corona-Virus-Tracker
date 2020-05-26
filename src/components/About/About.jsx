import React, {useState,useEffect} from 'react';
import './About.scss';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Typist from "react-typist";


const useStyles = makeStyles({
    root: {
      maxWidth: 345, 
      margin:10,
      display:'flex',
      'flex-direction':'column',
      alignItems:"center",
      justifyContent:"center"  ,
      textAlign:"center"   ,
      '@media only screen and (max-width:700px)' : {
        maxWidth: '60%',
      }
    },

    avatar: {
        width: 80,
        height: 80,
        marginTop:10,
        '@media only screen and (max-width:700px)' : {
            width: 50,
            height: 50,
          }
      },
  });
  
  
const ProfileCard = () => {
    const classes = useStyles();   
    const [count, setCount] = useState(1);

    useEffect(() => {
        setCount(1);
      }, [count]);
    
    return (
        <Card className={classes.root}>
        <Avatar className={classes.avatar} src={require("./icons/litesh.jpg")} />
        <CardActionArea>
        
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Litesh Zambare
            </Typography>
            
            {count ? (
            <Typist className="typist" avgTypingDelay={50} onTypingDone={() => setCount(0)}>
            <span>I am a Final Year CS Student</span>
            <Typist.Backspace count={21} delay={800} />
            <span>PICTian, Pune</span>
            <Typist.Backspace count={13} delay={800} />
            <span>Proud Indian <span role="img" aria-label="love">❤️</span></span>
            <Typist.Backspace count={17} delay={800} />
            <span>Aatma-Nirbhar <span role="img" aria-label="laugh">😅</span></span>
            <Typist.Backspace count={15} delay={800} />
            <span></span>
            </Typist>
        ) : (
            ""
        )}
            <Typography variant={window.screen.width>700 ? "body2" : "caption"} color="textSecondary" component="p">
              Hey awesome folks, Hope you all are doing good amidst this pandemic.
              Feel free to report any bugs,enhancements and your valuable reviews.
            </Typography>


            <div className="social">

                <a href="https://www.linkedin.com/in/lit-zambare/" target="_blank" rel="noopener noreferrer">
                <img className="Image" src={require("./icons/linkedin.png")} alt="Linkedin" />
                </a>

                <a href="https://github.com/Litesh97" target="_blank" rel="noopener noreferrer">
                <img className="Image" src={require("./icons/github.png")} alt="Github" />
                </a>

                <a href="https://www.facebook.com/litesh.zambare" target="_blank" rel="noopener noreferrer">
                <img className="Image" src={require("./icons/facebook.png")} alt="Facebook" />
                </a>

                <a href="https://www.instagram.com/lit_zambare/" target="_blank" rel="noopener noreferrer">
                <img className="Image" src={require("./icons/instagram.png")} alt="Instagram" />
                </a>


            </div>
            </CardContent>
            </CardActionArea>
            <CardActions>
        <Button href="https://github.com/Litesh97/Corona-Virus-Tracker.git" size="small" color="primary">
          Source Code
        </Button>
        <Button href="https://thevirustracker.com/api" size="small" color="primary">
          API-1
        </Button>
        <Button href="https://api.covid19india.org" size="small" color="primary">
          API-2
        </Button>
      </CardActions>
      <Typography variant="body2" color="textSecondary" component="p">
                  Made with <span role="img" aria-label="love" style={{color: '#e25555'}}>&#9829;</span> in India
                  </Typography>
      </Card>

    );
  };
  


const About = () => {
    return(
        <div>

            <div className="stars">
            <div className="twinkling">
            <div className="clouds">


            <div className="AboutContainer">
            <ProfileCard/>

            </div>

            </div>
            </div>
            </div>

  
        </div>
    );
}

export default About;