var SocialIcon = React.createClass({
  render: function() {
    return (
    	<li>
    		<a href="{this.props.url}">
    			<img src="{this.props.image}" alt="{this.props.name}" title="{this.props.name}" />
    		</a>
    	</li>
    );
  }
});

var SocialIconList = React.createClass({
  render: function() {
    return (
    	<ul>
    		<SocialIcon/>
    	</ul>
    );
  }
});

React.render(
  <SocialIconList data="/data/social-icons.json" />,
  document.getElementById('social-icons')
);