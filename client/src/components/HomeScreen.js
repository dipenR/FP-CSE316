import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_LOGOS = gql`
  {
    logos {
      _id
      text
      lastUpdate
    }
  }
`;

class HomeScreen extends Component {

    render() {
        return (
            <Query pollInterval={500} query={GET_LOGOS}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <div className="container row" style = {{backgroundColor: "#5CDB95"}}>
                            <div className="col s4">
                                <div id="home_banner_container" style = {{padding: "15px", fontSize: "42px", }}>
                                   GologoLo
                                </div>
                                <Link style = {{ textDecoration: "none", padding: "10px" }} id="add_logo_button" to="/create"><button style = {{textDecoration: "none", border: "none", backgroundColor: "#05386B", color: "#EDF5E1"}}>Add Logo</button></Link>
                            </div>
                            <div className="col s8">
                                <h3 style = {{ padding: "10px"}}>Recent Work</h3>
                                {data.logos.map((logo, index) => (
                                    <div key={index} className='home_logo_link'
                                        style={{ cursor: "pointer" }}>
                                        <Link style={{ textDecoration: "none", fontSize: "23px", padding: "20px", color: "#EDF5E1" }} to={`/view/${logo._id}`} 
                                        onClick = { () => { 
                                            let currentLogo = data.logos.filter(testLogo => testLogo.index !== logo.index);
                                            data.logos.unshift(currentLogo);
                                            } }>{logo.text}</Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                }
            }
            </Query >
        );
    }
}

export default HomeScreen;
