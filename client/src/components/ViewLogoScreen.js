import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text
            height
            width
            color
            fontSize
            bgcolor
            brcolor
            brradius
            brwidth
            padding
            margin
            lastUpdate
        }
    }
`;

const DELETE_LOGO = gql`
  mutation removeLogo($id: String!) {
    removeLogo(id:$id) {
      _id
    }
  }
`;

class ViewLogoScreen extends Component {

    render() {
        return (
            <Query pollInterval={500} query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <div className="container">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h4><Link style={{textDecoration: "none"}} to="/">Home</Link></h4>
                                    <h3 className="panel-title" style = {{ height: data.logo.height, width: data.logo.width, color: data.logo.color, 
                                            fontSize: data.logo.fontSize, backgroundColor: data.logo.bgcolor, 
                                            borderStyle: "solid", borderColor: data.logo.brcolor,
                                            borderRadius: data.logo.brradius, borderWidth: data.logo.brwidth, 
                                            padding: data.logo.padding, margin: data.logo.padding }}>
                                        {data.logo.text}
                                    </h3>
                                </div>
                                <div className="panel-body">
                                    <dl>
                                        <dt>Text:</dt>
                                        <dd>{data.logo.text}</dd>
                                        <dt>Height:</dt>
                                        <dd>{data.logo.height}</dd>
                                        <dt>Width:</dt>
                                        <dd>{data.logo.width}</dd>
                                        <dt>Color:</dt>
                                        <dd>{data.logo.color}</dd>
                                        <dt>Font Size:</dt>
                                        <dd>{data.logo.fontSize}</dd>
                                        <dt>Background Color:</dt>
                                        <dd>{data.logo.bgcolor}</dd>
                                        <dt>Border Color:</dt>
                                        <dd>{data.logo.brcolor}</dd>
                                        <dt>Border Radius:</dt>
                                        <dd>{data.logo.brradius}</dd>
                                        <dt>Border Width: :</dt>
                                        <dd>{data.logo.brwidth}</dd>
                                        <dt>Padding:</dt>
                                        <dd>{data.logo.padding}</dd>
                                        <dt>Margin:</dt>
                                        <dd>{data.logo.margin}</dd>
                                        <dt>Last Updated:</dt>
                                        <dd>{data.logo.lastUpdate}</dd>
                                    </dl>
                                    <Mutation mutation={DELETE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push('/')}>
                                        {(removeLogo, { loading, error }) => (
                                            <div>
                                                <form
                                                    onSubmit={e => {
                                                        e.preventDefault();
                                                        removeLogo({ variables: { id: data.logo._id } });
                                                    }}>
                                                    <Link to={`/edit/${data.logo._id}`} className="btn btn-success">Edit</Link>&nbsp;
                                                <button type="submit" className="btn btn-danger">Delete</button>
                                                </form>
                                                {loading && <p>Loading...</p>}
                                                {error && <p>Error :( Please try again</p>}
                                            </div>
                                        )}
                                    </Mutation>
                                </div>
                            </div>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default ViewLogoScreen;