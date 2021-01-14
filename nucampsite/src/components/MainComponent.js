import React, {useEffect} from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import { postFeedback, postComment, fetchCampsites, fetchComments, fetchPromotions, fetchPartners } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        partners: state.partners,
        promotions: state.promotions
    };
};

const mapDispatchToProps = {
    postComment: (campsiteId, rating, author, text) => (postComment(campsiteId, rating, author, text)),    fetchCampsites: () => (fetchCampsites()),
    postFeedback:(feedback) => postFeedback(feedback),
    resetFeedbackForm: () => (actions.reset('feedbackForm')),
    fetchComments: () => (fetchComments()),
    fetchPromotions: () => (fetchPromotions()),
    fetchPartners: () => (fetchPartners())
};



const Main = (props) => {

    useEffect(() => {
        props.fetchCampsites();
        props.fetchComments();
        props.fetchPromotions();
        props.fetchPartners();
    }, []); // runs at the beginning only. Only when it mounts.

    const HomePage = () => {
        return (
            <Home 
            campsite={props.campsites.campsites.filter(campsite => campsite.featured)[0]}
            campsitesLoading={props.campsites.isLoading}
            campsitesErrMess={props.campsites.errMess}
            partner={props.partners.partners.filter(partner => partner.featured)[0]}
            partnerLoading={props.partners.isLoading}
            partnerErrMess={props.partners.errMess}
            promotion={props.promotions.promotions.filter(promotion => promotion.featured)[0]}
            promotionLoading={props.promotions.isLoading}
            promotionErrMess={props.promotions.errMess} />
        );
    };

    const CampsiteWithId = ({match}) => {
        return (
            <CampsiteInfo 
                campsite={props.campsites.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
                isLoading={props.campsites.isLoading}
                errMess={props.campsites.errMess}
                comments={props.comments.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
                commentsErrMess={props.comments.errMess}
                postComment={props.postComment}
            />    
        );
    };  

    return (
        <div>
            <Header />
                    <TransitionGroup>
                    <CSSTransition key={props.location.key} classNames="page" timeout={300}>
                        <Switch> 
                            <Route path='/home' component={HomePage} />
                            <Route exact path='/directory' render={() => <Directory campsites={props.campsites} />} />
                            <Route path='/directory/:campsiteId' component={CampsiteWithId} />
                            <Route exact path='/contactus' render={() => <Contact postFeedback ={props.postFeedback} /> } />
                            <Route exact path='/aboutus' render={() => <About partners={props.partners} />} />
                            <Redirect to='/home' />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                
            <Footer/>
        </div>
    );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));