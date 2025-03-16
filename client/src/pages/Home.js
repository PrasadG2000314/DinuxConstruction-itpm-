import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
  useTheme,
  Zoom
} from "@mui/material";
import {
  PeopleAlt,
  Description,
  SentimentSatisfied,
  EmojiEvents,
  Phone,
  LocationOn,
  Email,
  Timelapse
} from '@mui/icons-material';

const HomePage = () => {
  const theme = useTheme();
  return (
    <div style={{
      backgroundColor: theme.palette.background.default,
      backgroundImage: "url(/img/bg-img.jpg)",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      backgroundPosition: "center",
    }}>
      <Box sx={{ backgroundColor: theme.palette.background.transparent }}>
        <HeroSection />
        <AboutSection />
        <TestimonialSection />
        <AchievementSection />
        <TeamSection />
        <ContactSection />
      </Box>
    </div>
  );
};
export default HomePage;

function HeroSection() {
  const navigate = useNavigate();
  const theme = useTheme();

  const heroBox = {
    backgroundImage: "url(/img/hero-bg1.png)",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    height: "100vh",
  };
  return (
    <Box id="home-section" component="section" sx={heroBox}>
      <Box sx={{ display: "flex", alignItems: "center", height: "100%", backgroundColor: "rgba(0,0,0,.5)" }}>
        <Container>
          <Box className="banner_content" sx={{ color: "#ffffff" }}>
            <Typography variant="subtitle1" sx={{ textTransform: "uppercase" }}>
              construction management tool
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "800",
                lineHeight: "70px",
              }}
            >
              Make It Easier To
              <br /> Manage
              <span style={{ color: theme.palette.primary.main }}>
                {" "}
                Constructions
              </span>
            </Typography>
            <Typography variant="h5">Take control of construction</Typography>
            <Button
              variant="contained"
              sx={{
                display: "inline-block",
                background: theme.palette.primary.main,
                padding: "0px 32px",
                color: "#fff",
                fontFamily: "Roboto, sans-serif",
                fontSize: "12px",
                fontWeight: "500",
                lineHeight: "44px",
                textAlign: "center",
                border: "1px solid",
                borderColor: theme.palette.primary.main,
                cursor: "pointer",
                textTransform: "uppercase",
                transition: "all 300ms linear 0s",
                borderRadius: "5px",
                marginTop: "4em",
                "&:hover": {
                  backgroundColor: "transparent",
                  borderColor: theme.palette.primary.main,
                },
              }}
              onClick={() => navigate("/packages")}
            >
              View Packages
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

const AboutSection = () => {

  const theme = useTheme();

  return (
    <Box>
      <Box
        id="about-us-section"
        sx={{
          height: '75vh',
          ml: 10,
          mr: 10,
          paddingBottom: 2,
          paddingTop: 10,
          '& h3': {
            fontSize: 25,
            margin: '0 0 20px',
          },
          '& h2': {
            position: 'relative',
            marginBottom: '15px',
            paddingBottom: '15px',
            '&::after': {
              position: 'absolute',
              background: 'linear-gradient(to right, #ff5200 0%, #ff5200 100%)',
              height: '4px',
              width: '60px',
              bottom: '0',
              left: '0',
            },
          },
          '& .about-text li': {
            marginBottom: '6px',
            marginLeft: '6px',
            listStyle: 'none',
            padding: '0',
            '&:before': {
              fontFamily: theme.palette.typography.poppins,
              fontSize: '11px',
              fontWeight: '300',
              paddingRight: '8px',
            },
          },
          '& img': {
            width: '40vw',
            marginTop: '10px',
            borderRight: '0',
          },
          '& p': {
            lineHeight: '24px',
            margin: '30px 0',
          },
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <img src="img/sideimg.png" alt="" sx={{ width: '100%' }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ padding: '0 20px' }}>
              <Typography variant="h2" gutterBottom>
                About Us
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ fontFamily: theme.palette.typography.poppins, fontSize: 18 }}>
                We are a passionate team of construction enthusiasts dedicated to revolutionizing the way projects are managed and executed.

                Our mission is to empower construction professionals with innovative tools and technologies that streamline processes, enhance collaboration, and drive project success
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const TestimonialSection = () => {

  const theme = useTheme();
  const testimons = [
    {
      img: "img/testimonial-1.jpg",
      text: "Apex Construction delivered exceptional results on our project. Their dedication to excellence and attention to detail were evident in every aspect of their work.",
      name: "John Smith"
    },
    {
      img: "img/testimonial-2.jpg",
      text: "We were thoroughly impressed by the professionalism and expertise of the Apex Construction team. They surpassed all our expectations and delivered outstanding results.",
      name: "Emily Johnson"
    },
    {
      img: "img/testimonial-3.jpg",
      text: "Choosing Apex Construction was the best decision we made for our project. Their commitment to quality and customer satisfaction is unmatched.",
      name: "Michael Brown"
    },
    {
      img: "img/testimonial-4.jpg",
      text: "Apex Construction sets the standard for excellence in the industry. Their team's dedication to delivering top-notch results is truly commendable.",
      name: "Sarah Davis"
    },
    {
      img: "img/testimonial-5.jpg",
      text: "We couldn't be happier with the work done by Apex Construction. Their professionalism and attention to detail made the entire process seamless and stress-free.",
      name: "Robert Miller"
    },
    {
      img: "img/testimonial-6.jpg",
      text: "Apex Construction exceeded our expectations in every way. Their commitment to quality and customer satisfaction is evident in the outstanding results they delivered.",
      name: "Jonathon Smile"
    }
  ];

  return (
    <Box id="testimonials" sx={{ paddingBottom: 20 }}>
      <Container>
        <Typography variant="h2" align="center" gutterBottom sx={{ fontFamily: theme.palette.typography.poppins }}>
          What our clients say
        </Typography>
        <Grid container spacing={3}>
          {testimons.map((d, i) => (
            <Grid item xs={12} md={4} key={`${d.name}-${i}`}>
              <Box sx={{ position: 'relative', padding: '20px' }}>
                <Box sx={{ float: 'left', marginRight: '15px' }}>
                  <Avatar src={d.img} alt="" sx={{ width: '64px', height: '64px', borderRadius: '50%' }} />
                </Box>
                <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                  <Typography variant="body1" sx={{ marginBottom: 0, fontStyle: 'italic' }}>
                    "{d.text}"
                  </Typography>
                  <Typography variant="body2" sx={{ marginTop: '10px', fontWeight: 600, color: '#666' }}>
                    - {d.name}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

const AchievementSection = () => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const elementPosition = document.getElementById('zoomElement').offsetTop;

      if (scrollPosition > elementPosition) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const achievements = [
    { title: 'Customers', count: '100+', icon: <PeopleAlt /> },
    { title: 'Projects', count: '500+', icon: <Description /> },
    { title: 'Contentment', count: '95%', icon: <SentimentSatisfied /> },
    { title: 'Awards', count: '50+', icon: <EmojiEvents /> },
    { title: 'Experience', count: '10+', icon: <Timelapse /> },
  ];

  return (
    <Box sx={{ paddingBottom: 20 }}>
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Our Achievements
      </Typography>
      <Grid container spacing={5} justifyContent="center">
        {achievements.map((achievement, index) => (
          <Grid item xs={4} md={2} key={index}>
            <Zoom id="zoomElement" in={isVisible} style={{ transitionDelay: isVisible ? '500ms' : '0ms' }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#f5f5f5', borderRadius: 2 }}>
                <CardContent sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: '#fff',
                  borderRadius: '2px 2px 0 0',
                  padding: '8px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  height: 100,
                }} className="triangulate">
                  {achievement.icon}{achievement.title}
                </CardContent>
                <CardContent sx={{ padding: '8px', height: 80 }}>
                  <Typography variant="h4" align="center" sx={{ fontSize: 40, fontWeight: 35, color: theme.palette.primary.main }}>
                    {achievement.count}
                  </Typography>
                </CardContent>
              </Card>
            </Zoom>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

const TeamSection = () => {
  const theme = useTheme();
  const TeamMembers = [
    {
      img: "img/team-1.jpg",
      name: "John Doe",
      job: "Project Manager"
    },
    {
      img: "img/team-2.jpg",
      name: "Mike Doe",
      job: "Construction Supervisor"
    },
    {
      img: "img/team-3.jpg",
      name: "Jane Doe",
      job: "Architect"
    },
    {
      img: "img/team-4.jpg",
      name: "Karen Doe",
      job: "Civil Engineer"
    }
  ];

  return (
    <Box id="team" sx={{ height: 'auto', paddingBottom: 20 }}>
      <Typography
        variant="h2"
        align="center"
        gutterBottom
        sx={{
          fontFamily: theme.palette.typography.poppins,
          background: `linear-gradient(to right, transparent 50%, #ff5200 50%)`,
          backgroundSize: '67% 0.4vh',
          backgroundPosition: '0 90%',
          backgroundRepeat: 'no-repeat'
        }}
      >
        Meet the Team
      </Typography>

      <Typography
        variant="body1"
        paragraph
        align="center"
        sx={{
          fontSize: 20,
          fontFamily: theme.palette.typography.poppins,
          marginBottom: 10
        }}
      >
        Building dreams, one blueprint at a time: Welcome to our Construction Management System, where every nail, every beam, and every detail crafts the future.
      </Typography>

      <Grid container spacing={2}>
        {TeamMembers.map((d, i) => (
          <Grid item xs={12} md={3} key={`${d.name}-${i}`}>
            <img src={d.img} alt="team member" style={{ width: '80%', height: 'auto', marginLeft: '10%', marginRight: '10%' }} />
            <Typography variant="h4" gutterBottom align="center" sx={{ fontFamily: theme.palette.typography.poppins }}>
              {d.name}
            </Typography>
            <Typography variant="body1" align="center" sx={{ fontFamily: theme.palette.typography.poppins }}>{d.job}</Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const ContactSection = () => {
  const theme = useTheme();
  const initialState = {
    name: '',
    email: '',
    message: '',
  };
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state.name, state.email, state.message);

    /* replace below with your own Service ID, Template ID and Public Key from your EmailJS account */
    /*
    emailjs
      .sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_PUBLIC_KEY')
      .then(
        (result) => {
          console.log(result.text);
          clearState();
        },
        (error) => {
          console.log(error.text);
        }
      );
      */
  };

  return (
    <Box id="contact-us-section" sx={{ background: theme.palette.background.white, color: theme.palette.text.default }}
      style={{
        maxWidth: '100%',
        height: 'auto',
        backgroundImage: "url(/img/contact-us-img.jpg)",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}>
      <Box sx={{ backgroundColor: "rgba(0,0,0,.5)", paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10 }}>
        <Box sx={{ backgroundColor: "rgba(240,240,240,.5)", borderRadius: 6, paddingTop: 5, paddingBottom: 5, paddingLeft: 5, paddingRight: 5 }}>
          <Typography variant="h2" align="center" sx={{ fontStyle: theme.palette.typography.poppins }} gutterBottom>
            Get In Touch
          </Typography>
          <Typography variant="h5" sx={{ fontStyle: theme.palette.typography.poppins }} paragraph>
            Please fill out the form below to send us an email and we will get back to you as soon as possible.
          </Typography>
          <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 5 }}>
            <Grid item xs={12} md={8} sx={{ padding: 5 }}>
              <form name="sentMessage" noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="name"
                      name="name"
                      label="Name"
                      variant="outlined"
                      required
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      required
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <TextField
                  fullWidth
                  name="message"
                  id="message"
                  aria-label="Message"
                  placeholder="Message"
                  variant="outlined"
                  required
                  multiline
                  minRows={4}
                  onChange={handleChange}
                  sx={{ marginTop: 5 }}
                />
                <Button
                  variant="contained"
                  sx={{
                    background: theme.palette.primary.main,
                    padding: "0px 32px",
                    color: "#fff",
                    fontFamily: "Roboto, sans-serif",
                    fontSize: "12px",
                    fontWeight: "500",
                    lineHeight: "44px",
                    textAlign: "center",
                    border: "1px solid",
                    borderColor: theme.palette.primary.main,
                    cursor: "pointer",
                    textTransform: "uppercase",
                    transition: "all 300ms linear 0s",
                    borderRadius: "5px",
                    marginTop: "4em",
                    "&:hover": {
                      backgroundColor: "transparent",
                      borderColor: theme.palette.primary.main,
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  Submit
                </Button>
              </form>
            </Grid>
            <Grid item xs={12} md={3} sx={{ paddingLeft: 5 }}>
              <Typography variant="h3" sx={{ fontStyle: theme.palette.typography.poppins }}>Contact Info</Typography>
              <Typography variant="body1" paragraph>
                <span>
                  <LocationOn /> Address
                </span>{' '}
                Colombo, Sri Lanka
              </Typography>
              <Typography variant="body1" paragraph>
                <span>
                  <Phone /> Phone
                </span>{' '}
                0712345678
              </Typography>
              <Typography variant="body1" paragraph>
                <span>
                  <Email /> Email
                </span>{' '}
                apexconstruction@gmail.com
              </Typography>

            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
