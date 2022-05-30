import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as types from './redux/actionTypes';
import { DirectionsRun } from '@material-ui/icons';
import { red } from '@material-ui/core/colors';

const cardStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '45ch',
    },
  },
}));

const gridStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  control: {
    padding: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();
  const gridClasses = gridStyles();
  const cardClasses = cardStyles();
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');
  const dispatch = useDispatch();
  const { recipes } = useSelector((state) => state.data);
  const [expanded, setExpanded] = useState(false);
  const [cardValue, setCardValue] = useState('');

  const handleExpandClick = (index) => {
    setExpanded(!expanded);
    setCardValue(index);
  };

  useEffect(() => {
    dispatch({ type: types.FETCH_RECIPE_START, query });
  }, [query]);

  const handleSearch = () => {
    setQuery(search);
    setSearch('');
  };

  return (
    <div className="App">
      <h2>Recipe App</h2>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ width: '80px', height: '50px' }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </form>
      <Grid container className={gridClasses.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            {recipes &&
              recipes.hits &&
              recipes.hits.map((item, index) => (
                <Grid key={index} item>
                  <Card className={cardClasses.root}>
                    <CardHeader
                      avatar={
                        <Avatar
                          aria-label="recipe"
                          className={cardClasses.avatar}
                        >
                          R
                        </Avatar>
                      }
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={item.recipe.label}
                      subheader={
                        <span>
                          <DirectionsRun />
                          {item.recipe.calories}
                        </span>
                      }
                    />
                    <CardMedia
                      className={cardClasses.media}
                      image={item.recipe.image}
                      title={item.recipe.label}
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        This impressive paella is a perfect party dish and a fun
                        meal to cook together with your guests. Add 1 cup of
                        frozen peas along with the mussels, if you like.
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                      <IconButton
                        className={clsx(cardClasses.expand, {
                          [cardClasses.expandOpen]: expanded,
                        })}
                        onClick={() => {
                          handleExpandClick(index);
                        }}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </CardActions>
                    <Collapse
                      in={expanded && cardValue === index}
                      timeout="auto"
                      unmountOnExit
                    >
                      <CardContent>
                        <Typography paragraph>Ingredients:</Typography>
                        {item.recipe.ingredients.map((ingredient) => (
                          <Typography>{ingredient.text}</Typography>
                        ))}
                      </CardContent>
                    </Collapse>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
