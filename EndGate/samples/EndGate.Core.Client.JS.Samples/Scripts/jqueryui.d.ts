  


<!DOCTYPE html>
<html>
  <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# githubog: http://ogp.me/ns/fb/githubog#">
    <meta charset='utf-8'>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>DefinitelyTyped/jqueryui/jqueryui.d.ts at master · borisyankov/DefinitelyTyped</title>
    <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="GitHub" />
    <link rel="fluid-icon" href="https://github.com/fluidicon.png" title="GitHub" />
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-114.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-144.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144.png" />
    <link rel="logo" type="image/svg" href="http://github-media-downloads.s3.amazonaws.com/github-logo.svg" />
    <link rel="xhr-socket" href="/_sockets">
    <meta name="msapplication-TileImage" content="/windows-tile.png">
    <meta name="msapplication-TileColor" content="#ffffff">

    
    
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />

    <meta content="authenticity_token" name="csrf-param" />
<meta content="P4WIb7bCh5J6GU+E+sMJ7T+goUWkpX0g1Fegbs5zHzM=" name="csrf-token" />

    <link href="https://a248.e.akamai.net/assets.github.com/assets/github-56b9445695845de3e4c1dd542f73a40fba02a571.css" media="all" rel="stylesheet" type="text/css" />
    <link href="https://a248.e.akamai.net/assets.github.com/assets/github2-acd1733fec6a20e8368c785414a4dde2ccd5cdf9.css" media="all" rel="stylesheet" type="text/css" />
    


      <script src="https://a248.e.akamai.net/assets.github.com/assets/frameworks-010d500708696b4ecee44478b5229d626367e844.js" type="text/javascript"></script>
      <script src="https://a248.e.akamai.net/assets.github.com/assets/github-3329be065d77913b894e37abd893738225005329.js" type="text/javascript"></script>
      
      <meta http-equiv="x-pjax-version" content="33f14df3310d35a3d11014278cfecce2">

        <link data-pjax-transient rel='permalink' href='/borisyankov/DefinitelyTyped/blob/bddcaf3d3586189215e5cfb1833c236bd0257373/jqueryui/jqueryui.d.ts'>
    <meta property="og:title" content="DefinitelyTyped"/>
    <meta property="og:type" content="githubog:gitrepository"/>
    <meta property="og:url" content="https://github.com/borisyankov/DefinitelyTyped"/>
    <meta property="og:image" content="https://secure.gravatar.com/avatar/6e226579f8163af9f5e73796abab0b79?s=420&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png"/>
    <meta property="og:site_name" content="GitHub"/>
    <meta property="og:description" content="DefinitelyTyped - The repository for high quality TypeScript type definitions."/>
    <meta property="twitter:card" content="summary"/>
    <meta property="twitter:site" content="@GitHub">
    <meta property="twitter:title" content="borisyankov/DefinitelyTyped"/>

    <meta name="description" content="DefinitelyTyped - The repository for high quality TypeScript type definitions." />

  <link href="https://github.com/borisyankov/DefinitelyTyped/commits/master.atom" rel="alternate" title="Recent Commits to DefinitelyTyped:master" type="application/atom+xml" />

  </head>


  <body class="logged_in page-blob windows vis-public env-production  ">
    <div id="wrapper">

      

      
      
      

      <div class="header header-logged-in true">
  <div class="container clearfix">

    <a class="header-logo-blacktocat" href="https://github.com/">
  <span class="mega-icon mega-icon-blacktocat"></span>
</a>

    <div class="divider-vertical"></div>

    
  <a href="/notifications" class="notification-indicator tooltipped downwards" title="You have unread notifications">
    <span class="mail-status unread"></span>
  </a>
  <div class="divider-vertical"></div>


      <div class="command-bar js-command-bar  ">
            <form accept-charset="UTF-8" action="/search" class="command-bar-form" id="top_search_form" method="get">
  <a href="/search/advanced" class="advanced-search-icon tooltipped downwards command-bar-search" id="advanced_search" title="Advanced search"><span class="mini-icon mini-icon-advanced-search "></span></a>

  <input type="text" data-hotkey="/ s" name="q" id="js-command-bar-field" placeholder="Search or type a command" tabindex="1" data-username="NTaylorMullen" autocapitalize="off">

  <span class="mini-icon help tooltipped downwards" title="Show command bar help">
    <span class="mini-icon mini-icon-help"></span>
  </span>

  <input type="hidden" name="ref" value="cmdform">

    <input type="hidden" class="js-repository-name-with-owner" value="borisyankov/DefinitelyTyped"/>
    <input type="hidden" class="js-repository-branch" value="master"/>
    <input type="hidden" class="js-repository-tree-sha" value="c890b404589bd5580ef12395c23fee085c9cee80"/>

  <div class="divider-vertical"></div>
</form>
        <ul class="top-nav">
            <li class="explore"><a href="https://github.com/explore">Explore</a></li>
            <li><a href="https://gist.github.com">Gist</a></li>
            <li><a href="/blog">Blog</a></li>
          <li><a href="http://help.github.com">Help</a></li>
        </ul>
      </div>

    

  

    <ul id="user-links">
      <li>
        <a href="https://github.com/NTaylorMullen" class="name">
          <img height="20" src="https://secure.gravatar.com/avatar/4442bee53d2366d1020616c5bfab3ebe?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="20" /> NTaylorMullen
        </a>
      </li>

        <li>
          <a href="/new" id="new_repo" class="tooltipped downwards" title="Create a new repo">
            <span class="mini-icon mini-icon-create"></span>
          </a>
        </li>

        <li>
          <a href="/settings/profile" id="account_settings"
            class="tooltipped downwards"
            title="Account settings ">
            <span class="mini-icon mini-icon-account-settings"></span>
          </a>
        </li>
        <li>
          <a class="tooltipped downwards" href="/logout" data-method="post" id="logout" title="Sign out">
            <span class="mini-icon mini-icon-logout"></span>
          </a>
        </li>

    </ul>


<div class="js-new-dropdown-contents hidden">
  <ul class="dropdown-menu">
    <li>
      <a href="/new"><span class="mini-icon mini-icon-create"></span> New repository</a>
    </li>
    <li>
        <a href="https://github.com/borisyankov/DefinitelyTyped/issues/new"><span class="mini-icon mini-icon-issue-opened"></span> New issue</a>
    </li>
    <li>
    </li>
    <li>
      <a href="/organizations/new"><span class="mini-icon mini-icon-u-list"></span> New organization</a>
    </li>
  </ul>
</div>


    
  </div>
</div>

      

      

      


            <div class="site hfeed" itemscope itemtype="http://schema.org/WebPage">
      <div class="hentry">
        
        <div class="pagehead repohead instapaper_ignore readability-menu ">
          <div class="container">
            <div class="title-actions-bar">
              


<ul class="pagehead-actions">


    <li class="subscription">
      <form accept-charset="UTF-8" action="/notifications/subscribe" data-autosubmit="true" data-remote="true" method="post"><div style="margin:0;padding:0;display:inline"><input name="authenticity_token" type="hidden" value="P4WIb7bCh5J6GU+E+sMJ7T+goUWkpX0g1Fegbs5zHzM=" /></div>  <input id="repository_id" name="repository_id" type="hidden" value="6093316" />

    <div class="select-menu js-menu-container js-select-menu">
      <span class="minibutton select-menu-button js-menu-target">
        <span class="js-select-button">
          <span class="mini-icon mini-icon-watching"></span>
          Watch
        </span>
      </span>

      <div class="select-menu-modal-holder js-menu-content">
        <div class="select-menu-modal">
          <div class="select-menu-header">
            <span class="select-menu-title">Notification status</span>
            <span class="mini-icon mini-icon-remove-close js-menu-close"></span>
          </div> <!-- /.select-menu-header -->

          <div class="select-menu-list js-navigation-container">

            <div class="select-menu-item js-navigation-item js-navigation-target selected">
              <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
              <div class="select-menu-item-text">
                <input checked="checked" id="do_included" name="do" type="radio" value="included" />
                <h4>Not watching</h4>
                <span class="description">You only receive notifications for discussions in which you participate or are @mentioned.</span>
                <span class="js-select-button-text hidden-select-button-text">
                  <span class="mini-icon mini-icon-watching"></span>
                  Watch
                </span>
              </div>
            </div> <!-- /.select-menu-item -->

            <div class="select-menu-item js-navigation-item js-navigation-target ">
              <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
              <div class="select-menu-item-text">
                <input id="do_subscribed" name="do" type="radio" value="subscribed" />
                <h4>Watching</h4>
                <span class="description">You receive notifications for all discussions in this repository.</span>
                <span class="js-select-button-text hidden-select-button-text">
                  <span class="mini-icon mini-icon-unwatch"></span>
                  Unwatch
                </span>
              </div>
            </div> <!-- /.select-menu-item -->

            <div class="select-menu-item js-navigation-item js-navigation-target ">
              <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
              <div class="select-menu-item-text">
                <input id="do_ignore" name="do" type="radio" value="ignore" />
                <h4>Ignoring</h4>
                <span class="description">You do not receive any notifications for discussions in this repository.</span>
                <span class="js-select-button-text hidden-select-button-text">
                  <span class="mini-icon mini-icon-mute"></span>
                  Stop ignoring
                </span>
              </div>
            </div> <!-- /.select-menu-item -->

          </div> <!-- /.select-menu-list -->

        </div> <!-- /.select-menu-modal -->
      </div> <!-- /.select-menu-modal-holder -->
    </div> <!-- /.select-menu -->

</form>
    </li>

    <li class="js-toggler-container js-social-container starring-container ">
      <a href="/borisyankov/DefinitelyTyped/unstar" class="minibutton js-toggler-target star-button starred upwards" title="Unstar this repo" data-remote="true" data-method="post" rel="nofollow">
        <span class="mini-icon mini-icon-remove-star"></span>
        <span class="text">Unstar</span>
      </a>
      <a href="/borisyankov/DefinitelyTyped/star" class="minibutton js-toggler-target star-button unstarred upwards" title="Star this repo" data-remote="true" data-method="post" rel="nofollow">
        <span class="mini-icon mini-icon-star"></span>
        <span class="text">Star</span>
      </a>
      <a class="social-count js-social-count" href="/borisyankov/DefinitelyTyped/stargazers">772</a>
    </li>

        <li>
          <a href="/borisyankov/DefinitelyTyped/fork_select" class="minibutton js-toggler-target fork-button lighter upwards" title="Fork this repo" rel="facebox nofollow">
            <span class="mini-icon mini-icon-branch-create"></span>
            <span class="text">Fork</span>
          </a>
          <a href="/borisyankov/DefinitelyTyped/network" class="social-count">327</a>
        </li>


</ul>

              <h1 itemscope itemtype="http://data-vocabulary.org/Breadcrumb" class="entry-title public">
                <span class="repo-label"><span>public</span></span>
                <span class="mega-icon mega-icon-public-repo"></span>
                <span class="author vcard">
                  <a href="/borisyankov" class="url fn" itemprop="url" rel="author">
                  <span itemprop="title">borisyankov</span>
                  </a></span> /
                <strong><a href="/borisyankov/DefinitelyTyped" class="js-current-repository">DefinitelyTyped</a></strong>
              </h1>
            </div>

            
  <ul class="tabs">
    <li><a href="/borisyankov/DefinitelyTyped" class="selected" highlight="repo_source repo_downloads repo_commits repo_tags repo_branches">Code</a></li>
    <li><a href="/borisyankov/DefinitelyTyped/network" highlight="repo_network">Network</a></li>
    <li><a href="/borisyankov/DefinitelyTyped/pulls" highlight="repo_pulls">Pull Requests <span class='counter'>3</span></a></li>

      <li><a href="/borisyankov/DefinitelyTyped/issues" highlight="repo_issues">Issues <span class='counter'>46</span></a></li>

      <li><a href="/borisyankov/DefinitelyTyped/wiki" highlight="repo_wiki">Wiki</a></li>


    <li><a href="/borisyankov/DefinitelyTyped/graphs" highlight="repo_graphs repo_contributors">Graphs</a></li>


  </ul>
  
<div class="tabnav">

  <span class="tabnav-right">
    <ul class="tabnav-tabs">
          <li><a href="/borisyankov/DefinitelyTyped/tags" class="tabnav-tab" highlight="repo_tags">Tags <span class="counter blank">0</span></a></li>
    </ul>
    
  </span>

  <div class="tabnav-widget scope">


    <div class="select-menu js-menu-container js-select-menu js-branch-menu">
      <a class="minibutton select-menu-button js-menu-target" data-hotkey="w" data-ref="master">
        <span class="mini-icon mini-icon-branch"></span>
        <i>branch:</i>
        <span class="js-select-button">master</span>
      </a>

      <div class="select-menu-modal-holder js-menu-content js-navigation-container">

        <div class="select-menu-modal">
          <div class="select-menu-header">
            <span class="select-menu-title">Switch branches/tags</span>
            <span class="mini-icon mini-icon-remove-close js-menu-close"></span>
          </div> <!-- /.select-menu-header -->

          <div class="select-menu-filters">
            <div class="select-menu-text-filter">
              <input type="text" id="commitish-filter-field" class="js-filterable-field js-navigation-enable" placeholder="Filter branches/tags">
            </div>
            <div class="select-menu-tabs">
              <ul>
                <li class="select-menu-tab">
                  <a href="#" data-tab-filter="branches" class="js-select-menu-tab">Branches</a>
                </li>
                <li class="select-menu-tab">
                  <a href="#" data-tab-filter="tags" class="js-select-menu-tab">Tags</a>
                </li>
              </ul>
            </div><!-- /.select-menu-tabs -->
          </div><!-- /.select-menu-filters -->

          <div class="select-menu-list select-menu-tab-bucket js-select-menu-tab-bucket css-truncate" data-tab-filter="branches">

            <div data-filterable-for="commitish-filter-field" data-filterable-type="substring">

                <div class="select-menu-item js-navigation-item js-navigation-target ">
                  <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
                  <a href="/borisyankov/DefinitelyTyped/blob/diegovilar-master/jqueryui/jqueryui.d.ts" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="diegovilar-master" rel="nofollow" title="diegovilar-master">diegovilar-master</a>
                </div> <!-- /.select-menu-item -->
                <div class="select-menu-item js-navigation-item js-navigation-target selected">
                  <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
                  <a href="/borisyankov/DefinitelyTyped/blob/master/jqueryui/jqueryui.d.ts" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="master" rel="nofollow" title="master">master</a>
                </div> <!-- /.select-menu-item -->
            </div>

              <div class="select-menu-no-results">Nothing to show</div>
          </div> <!-- /.select-menu-list -->


          <div class="select-menu-list select-menu-tab-bucket js-select-menu-tab-bucket css-truncate" data-tab-filter="tags">
            <div data-filterable-for="commitish-filter-field" data-filterable-type="substring">

            </div>

            <div class="select-menu-no-results">Nothing to show</div>

          </div> <!-- /.select-menu-list -->

        </div> <!-- /.select-menu-modal -->
      </div> <!-- /.select-menu-modal-holder -->
    </div> <!-- /.select-menu -->

  </div> <!-- /.scope -->

  <ul class="tabnav-tabs">
    <li><a href="/borisyankov/DefinitelyTyped" class="selected tabnav-tab" highlight="repo_source">Files</a></li>
    <li><a href="/borisyankov/DefinitelyTyped/commits/master" class="tabnav-tab" highlight="repo_commits">Commits</a></li>
    <li><a href="/borisyankov/DefinitelyTyped/branches" class="tabnav-tab" highlight="repo_branches" rel="nofollow">Branches <span class="counter ">2</span></a></li>
  </ul>

</div>

  
  
  


            
          </div>
        </div><!-- /.repohead -->

        <div id="js-repo-pjax-container" class="container context-loader-container" data-pjax-container>
          


<!-- blob contrib key: blob_contributors:v21:cf83df0200682a3917134673af92da57 -->
<!-- blob contrib frag key: views10/v8/blob_contributors:v21:cf83df0200682a3917134673af92da57 -->


<div id="slider">
    <div class="frame-meta">

      <p title="This is a placeholder element" class="js-history-link-replace hidden"></p>

        <div class="breadcrumb">
          <span class='bold'><span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/borisyankov/DefinitelyTyped" class="js-slide-to" data-branch="master" data-direction="back" itemscope="url"><span itemprop="title">DefinitelyTyped</span></a></span></span><span class="separator"> / </span><span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/borisyankov/DefinitelyTyped/tree/master/jqueryui" class="js-slide-to" data-branch="master" data-direction="back" itemscope="url"><span itemprop="title">jqueryui</span></a></span><span class="separator"> / </span><strong class="final-path">jqueryui.d.ts</strong> <span class="js-zeroclipboard zeroclipboard-button" data-clipboard-text="jqueryui/jqueryui.d.ts" data-copied-hint="copied!" title="copy to clipboard"><span class="mini-icon mini-icon-clipboard"></span></span>
        </div>

      <a href="/borisyankov/DefinitelyTyped/find/master" class="js-slide-to" data-hotkey="t" style="display:none">Show File Finder</a>


        
  <div class="commit file-history-tease">
    <img class="main-avatar" height="24" src="https://secure.gravatar.com/avatar/82d2b4bab91a8216032461d552fbc3a6?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
    <span class="author"><a href="/AbraaoAlves" rel="author">AbraaoAlves</a></span>
    <time class="js-relative-date" datetime="2013-02-22T13:15:05-08:00" title="2013-02-22 13:15:05">February 22, 2013</time>
    <div class="commit-title">
        <a href="/borisyankov/DefinitelyTyped/commit/3eff9e52312ca4f2961ef0927b631f772ecf1673" class="message">define escapeRegex function</a>
    </div>

    <div class="participation">
      <p class="quickstat"><a href="#blob_contributors_box" rel="facebox"><strong>3</strong> contributors</a></p>
          <a class="avatar tooltipped downwards" title="AbraaoAlves" href="/borisyankov/DefinitelyTyped/commits/master/jqueryui/jqueryui.d.ts?author=AbraaoAlves"><img height="20" src="https://secure.gravatar.com/avatar/82d2b4bab91a8216032461d552fbc3a6?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="20" /></a>
    <a class="avatar tooltipped downwards" title="borisyankov" href="/borisyankov/DefinitelyTyped/commits/master/jqueryui/jqueryui.d.ts?author=borisyankov"><img height="20" src="https://secure.gravatar.com/avatar/6e226579f8163af9f5e73796abab0b79?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="20" /></a>
    <a class="avatar tooltipped downwards" title="bacr" href="/borisyankov/DefinitelyTyped/commits/master/jqueryui/jqueryui.d.ts?author=bacr"><img height="20" src="https://secure.gravatar.com/avatar/81a3ad0fbcf43c219a561f38e52e5c09?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="20" /></a>


    </div>
    <div id="blob_contributors_box" style="display:none">
      <h2>Users on GitHub who have contributed to this file</h2>
      <ul class="facebox-user-list">
        <li>
          <img height="24" src="https://secure.gravatar.com/avatar/82d2b4bab91a8216032461d552fbc3a6?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
          <a href="/AbraaoAlves">AbraaoAlves</a>
        </li>
        <li>
          <img height="24" src="https://secure.gravatar.com/avatar/6e226579f8163af9f5e73796abab0b79?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
          <a href="/borisyankov">borisyankov</a>
        </li>
        <li>
          <img height="24" src="https://secure.gravatar.com/avatar/81a3ad0fbcf43c219a561f38e52e5c09?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
          <a href="/bacr">bacr</a>
        </li>
      </ul>
    </div>
  </div>


    </div><!-- ./.frame-meta -->

    <div class="frames">
      <div class="frame" data-permalink-url="/borisyankov/DefinitelyTyped/blob/bddcaf3d3586189215e5cfb1833c236bd0257373/jqueryui/jqueryui.d.ts" data-title="DefinitelyTyped/jqueryui/jqueryui.d.ts at master · borisyankov/DefinitelyTyped · GitHub" data-type="blob">

        <div id="files" class="bubble">
          <div class="file">
            <div class="meta">
              <div class="info">
                <span class="icon"><b class="mini-icon mini-icon-text-file"></b></span>
                <span class="mode" title="File Mode">file</span>
                  <span>954 lines (786 sloc)</span>
                <span>26.393 kb</span>
              </div>
              <div class="actions">
                <div class="button-group">
                        <a class="minibutton tooltipped leftwards"
                           title="Clicking this button will automatically fork this project so you can edit the file"
                           href="/borisyankov/DefinitelyTyped/edit/master/jqueryui/jqueryui.d.ts"
                           data-method="post" rel="nofollow">Edit</a>
                  <a href="/borisyankov/DefinitelyTyped/raw/master/jqueryui/jqueryui.d.ts" class="button minibutton " id="raw-url">Raw</a>
                    <a href="/borisyankov/DefinitelyTyped/blame/master/jqueryui/jqueryui.d.ts" class="button minibutton ">Blame</a>
                  <a href="/borisyankov/DefinitelyTyped/commits/master/jqueryui/jqueryui.d.ts" class="button minibutton " rel="nofollow">History</a>
                </div><!-- /.button-group -->
              </div><!-- /.actions -->

            </div>
                <div class="blob-wrapper data type-typescript js-blob-data">
      <table class="file-code file-diff">
        <tr class="file-code-line">
          <td class="blob-line-nums">
            <span id="L1" rel="#L1">1</span>
<span id="L2" rel="#L2">2</span>
<span id="L3" rel="#L3">3</span>
<span id="L4" rel="#L4">4</span>
<span id="L5" rel="#L5">5</span>
<span id="L6" rel="#L6">6</span>
<span id="L7" rel="#L7">7</span>
<span id="L8" rel="#L8">8</span>
<span id="L9" rel="#L9">9</span>
<span id="L10" rel="#L10">10</span>
<span id="L11" rel="#L11">11</span>
<span id="L12" rel="#L12">12</span>
<span id="L13" rel="#L13">13</span>
<span id="L14" rel="#L14">14</span>
<span id="L15" rel="#L15">15</span>
<span id="L16" rel="#L16">16</span>
<span id="L17" rel="#L17">17</span>
<span id="L18" rel="#L18">18</span>
<span id="L19" rel="#L19">19</span>
<span id="L20" rel="#L20">20</span>
<span id="L21" rel="#L21">21</span>
<span id="L22" rel="#L22">22</span>
<span id="L23" rel="#L23">23</span>
<span id="L24" rel="#L24">24</span>
<span id="L25" rel="#L25">25</span>
<span id="L26" rel="#L26">26</span>
<span id="L27" rel="#L27">27</span>
<span id="L28" rel="#L28">28</span>
<span id="L29" rel="#L29">29</span>
<span id="L30" rel="#L30">30</span>
<span id="L31" rel="#L31">31</span>
<span id="L32" rel="#L32">32</span>
<span id="L33" rel="#L33">33</span>
<span id="L34" rel="#L34">34</span>
<span id="L35" rel="#L35">35</span>
<span id="L36" rel="#L36">36</span>
<span id="L37" rel="#L37">37</span>
<span id="L38" rel="#L38">38</span>
<span id="L39" rel="#L39">39</span>
<span id="L40" rel="#L40">40</span>
<span id="L41" rel="#L41">41</span>
<span id="L42" rel="#L42">42</span>
<span id="L43" rel="#L43">43</span>
<span id="L44" rel="#L44">44</span>
<span id="L45" rel="#L45">45</span>
<span id="L46" rel="#L46">46</span>
<span id="L47" rel="#L47">47</span>
<span id="L48" rel="#L48">48</span>
<span id="L49" rel="#L49">49</span>
<span id="L50" rel="#L50">50</span>
<span id="L51" rel="#L51">51</span>
<span id="L52" rel="#L52">52</span>
<span id="L53" rel="#L53">53</span>
<span id="L54" rel="#L54">54</span>
<span id="L55" rel="#L55">55</span>
<span id="L56" rel="#L56">56</span>
<span id="L57" rel="#L57">57</span>
<span id="L58" rel="#L58">58</span>
<span id="L59" rel="#L59">59</span>
<span id="L60" rel="#L60">60</span>
<span id="L61" rel="#L61">61</span>
<span id="L62" rel="#L62">62</span>
<span id="L63" rel="#L63">63</span>
<span id="L64" rel="#L64">64</span>
<span id="L65" rel="#L65">65</span>
<span id="L66" rel="#L66">66</span>
<span id="L67" rel="#L67">67</span>
<span id="L68" rel="#L68">68</span>
<span id="L69" rel="#L69">69</span>
<span id="L70" rel="#L70">70</span>
<span id="L71" rel="#L71">71</span>
<span id="L72" rel="#L72">72</span>
<span id="L73" rel="#L73">73</span>
<span id="L74" rel="#L74">74</span>
<span id="L75" rel="#L75">75</span>
<span id="L76" rel="#L76">76</span>
<span id="L77" rel="#L77">77</span>
<span id="L78" rel="#L78">78</span>
<span id="L79" rel="#L79">79</span>
<span id="L80" rel="#L80">80</span>
<span id="L81" rel="#L81">81</span>
<span id="L82" rel="#L82">82</span>
<span id="L83" rel="#L83">83</span>
<span id="L84" rel="#L84">84</span>
<span id="L85" rel="#L85">85</span>
<span id="L86" rel="#L86">86</span>
<span id="L87" rel="#L87">87</span>
<span id="L88" rel="#L88">88</span>
<span id="L89" rel="#L89">89</span>
<span id="L90" rel="#L90">90</span>
<span id="L91" rel="#L91">91</span>
<span id="L92" rel="#L92">92</span>
<span id="L93" rel="#L93">93</span>
<span id="L94" rel="#L94">94</span>
<span id="L95" rel="#L95">95</span>
<span id="L96" rel="#L96">96</span>
<span id="L97" rel="#L97">97</span>
<span id="L98" rel="#L98">98</span>
<span id="L99" rel="#L99">99</span>
<span id="L100" rel="#L100">100</span>
<span id="L101" rel="#L101">101</span>
<span id="L102" rel="#L102">102</span>
<span id="L103" rel="#L103">103</span>
<span id="L104" rel="#L104">104</span>
<span id="L105" rel="#L105">105</span>
<span id="L106" rel="#L106">106</span>
<span id="L107" rel="#L107">107</span>
<span id="L108" rel="#L108">108</span>
<span id="L109" rel="#L109">109</span>
<span id="L110" rel="#L110">110</span>
<span id="L111" rel="#L111">111</span>
<span id="L112" rel="#L112">112</span>
<span id="L113" rel="#L113">113</span>
<span id="L114" rel="#L114">114</span>
<span id="L115" rel="#L115">115</span>
<span id="L116" rel="#L116">116</span>
<span id="L117" rel="#L117">117</span>
<span id="L118" rel="#L118">118</span>
<span id="L119" rel="#L119">119</span>
<span id="L120" rel="#L120">120</span>
<span id="L121" rel="#L121">121</span>
<span id="L122" rel="#L122">122</span>
<span id="L123" rel="#L123">123</span>
<span id="L124" rel="#L124">124</span>
<span id="L125" rel="#L125">125</span>
<span id="L126" rel="#L126">126</span>
<span id="L127" rel="#L127">127</span>
<span id="L128" rel="#L128">128</span>
<span id="L129" rel="#L129">129</span>
<span id="L130" rel="#L130">130</span>
<span id="L131" rel="#L131">131</span>
<span id="L132" rel="#L132">132</span>
<span id="L133" rel="#L133">133</span>
<span id="L134" rel="#L134">134</span>
<span id="L135" rel="#L135">135</span>
<span id="L136" rel="#L136">136</span>
<span id="L137" rel="#L137">137</span>
<span id="L138" rel="#L138">138</span>
<span id="L139" rel="#L139">139</span>
<span id="L140" rel="#L140">140</span>
<span id="L141" rel="#L141">141</span>
<span id="L142" rel="#L142">142</span>
<span id="L143" rel="#L143">143</span>
<span id="L144" rel="#L144">144</span>
<span id="L145" rel="#L145">145</span>
<span id="L146" rel="#L146">146</span>
<span id="L147" rel="#L147">147</span>
<span id="L148" rel="#L148">148</span>
<span id="L149" rel="#L149">149</span>
<span id="L150" rel="#L150">150</span>
<span id="L151" rel="#L151">151</span>
<span id="L152" rel="#L152">152</span>
<span id="L153" rel="#L153">153</span>
<span id="L154" rel="#L154">154</span>
<span id="L155" rel="#L155">155</span>
<span id="L156" rel="#L156">156</span>
<span id="L157" rel="#L157">157</span>
<span id="L158" rel="#L158">158</span>
<span id="L159" rel="#L159">159</span>
<span id="L160" rel="#L160">160</span>
<span id="L161" rel="#L161">161</span>
<span id="L162" rel="#L162">162</span>
<span id="L163" rel="#L163">163</span>
<span id="L164" rel="#L164">164</span>
<span id="L165" rel="#L165">165</span>
<span id="L166" rel="#L166">166</span>
<span id="L167" rel="#L167">167</span>
<span id="L168" rel="#L168">168</span>
<span id="L169" rel="#L169">169</span>
<span id="L170" rel="#L170">170</span>
<span id="L171" rel="#L171">171</span>
<span id="L172" rel="#L172">172</span>
<span id="L173" rel="#L173">173</span>
<span id="L174" rel="#L174">174</span>
<span id="L175" rel="#L175">175</span>
<span id="L176" rel="#L176">176</span>
<span id="L177" rel="#L177">177</span>
<span id="L178" rel="#L178">178</span>
<span id="L179" rel="#L179">179</span>
<span id="L180" rel="#L180">180</span>
<span id="L181" rel="#L181">181</span>
<span id="L182" rel="#L182">182</span>
<span id="L183" rel="#L183">183</span>
<span id="L184" rel="#L184">184</span>
<span id="L185" rel="#L185">185</span>
<span id="L186" rel="#L186">186</span>
<span id="L187" rel="#L187">187</span>
<span id="L188" rel="#L188">188</span>
<span id="L189" rel="#L189">189</span>
<span id="L190" rel="#L190">190</span>
<span id="L191" rel="#L191">191</span>
<span id="L192" rel="#L192">192</span>
<span id="L193" rel="#L193">193</span>
<span id="L194" rel="#L194">194</span>
<span id="L195" rel="#L195">195</span>
<span id="L196" rel="#L196">196</span>
<span id="L197" rel="#L197">197</span>
<span id="L198" rel="#L198">198</span>
<span id="L199" rel="#L199">199</span>
<span id="L200" rel="#L200">200</span>
<span id="L201" rel="#L201">201</span>
<span id="L202" rel="#L202">202</span>
<span id="L203" rel="#L203">203</span>
<span id="L204" rel="#L204">204</span>
<span id="L205" rel="#L205">205</span>
<span id="L206" rel="#L206">206</span>
<span id="L207" rel="#L207">207</span>
<span id="L208" rel="#L208">208</span>
<span id="L209" rel="#L209">209</span>
<span id="L210" rel="#L210">210</span>
<span id="L211" rel="#L211">211</span>
<span id="L212" rel="#L212">212</span>
<span id="L213" rel="#L213">213</span>
<span id="L214" rel="#L214">214</span>
<span id="L215" rel="#L215">215</span>
<span id="L216" rel="#L216">216</span>
<span id="L217" rel="#L217">217</span>
<span id="L218" rel="#L218">218</span>
<span id="L219" rel="#L219">219</span>
<span id="L220" rel="#L220">220</span>
<span id="L221" rel="#L221">221</span>
<span id="L222" rel="#L222">222</span>
<span id="L223" rel="#L223">223</span>
<span id="L224" rel="#L224">224</span>
<span id="L225" rel="#L225">225</span>
<span id="L226" rel="#L226">226</span>
<span id="L227" rel="#L227">227</span>
<span id="L228" rel="#L228">228</span>
<span id="L229" rel="#L229">229</span>
<span id="L230" rel="#L230">230</span>
<span id="L231" rel="#L231">231</span>
<span id="L232" rel="#L232">232</span>
<span id="L233" rel="#L233">233</span>
<span id="L234" rel="#L234">234</span>
<span id="L235" rel="#L235">235</span>
<span id="L236" rel="#L236">236</span>
<span id="L237" rel="#L237">237</span>
<span id="L238" rel="#L238">238</span>
<span id="L239" rel="#L239">239</span>
<span id="L240" rel="#L240">240</span>
<span id="L241" rel="#L241">241</span>
<span id="L242" rel="#L242">242</span>
<span id="L243" rel="#L243">243</span>
<span id="L244" rel="#L244">244</span>
<span id="L245" rel="#L245">245</span>
<span id="L246" rel="#L246">246</span>
<span id="L247" rel="#L247">247</span>
<span id="L248" rel="#L248">248</span>
<span id="L249" rel="#L249">249</span>
<span id="L250" rel="#L250">250</span>
<span id="L251" rel="#L251">251</span>
<span id="L252" rel="#L252">252</span>
<span id="L253" rel="#L253">253</span>
<span id="L254" rel="#L254">254</span>
<span id="L255" rel="#L255">255</span>
<span id="L256" rel="#L256">256</span>
<span id="L257" rel="#L257">257</span>
<span id="L258" rel="#L258">258</span>
<span id="L259" rel="#L259">259</span>
<span id="L260" rel="#L260">260</span>
<span id="L261" rel="#L261">261</span>
<span id="L262" rel="#L262">262</span>
<span id="L263" rel="#L263">263</span>
<span id="L264" rel="#L264">264</span>
<span id="L265" rel="#L265">265</span>
<span id="L266" rel="#L266">266</span>
<span id="L267" rel="#L267">267</span>
<span id="L268" rel="#L268">268</span>
<span id="L269" rel="#L269">269</span>
<span id="L270" rel="#L270">270</span>
<span id="L271" rel="#L271">271</span>
<span id="L272" rel="#L272">272</span>
<span id="L273" rel="#L273">273</span>
<span id="L274" rel="#L274">274</span>
<span id="L275" rel="#L275">275</span>
<span id="L276" rel="#L276">276</span>
<span id="L277" rel="#L277">277</span>
<span id="L278" rel="#L278">278</span>
<span id="L279" rel="#L279">279</span>
<span id="L280" rel="#L280">280</span>
<span id="L281" rel="#L281">281</span>
<span id="L282" rel="#L282">282</span>
<span id="L283" rel="#L283">283</span>
<span id="L284" rel="#L284">284</span>
<span id="L285" rel="#L285">285</span>
<span id="L286" rel="#L286">286</span>
<span id="L287" rel="#L287">287</span>
<span id="L288" rel="#L288">288</span>
<span id="L289" rel="#L289">289</span>
<span id="L290" rel="#L290">290</span>
<span id="L291" rel="#L291">291</span>
<span id="L292" rel="#L292">292</span>
<span id="L293" rel="#L293">293</span>
<span id="L294" rel="#L294">294</span>
<span id="L295" rel="#L295">295</span>
<span id="L296" rel="#L296">296</span>
<span id="L297" rel="#L297">297</span>
<span id="L298" rel="#L298">298</span>
<span id="L299" rel="#L299">299</span>
<span id="L300" rel="#L300">300</span>
<span id="L301" rel="#L301">301</span>
<span id="L302" rel="#L302">302</span>
<span id="L303" rel="#L303">303</span>
<span id="L304" rel="#L304">304</span>
<span id="L305" rel="#L305">305</span>
<span id="L306" rel="#L306">306</span>
<span id="L307" rel="#L307">307</span>
<span id="L308" rel="#L308">308</span>
<span id="L309" rel="#L309">309</span>
<span id="L310" rel="#L310">310</span>
<span id="L311" rel="#L311">311</span>
<span id="L312" rel="#L312">312</span>
<span id="L313" rel="#L313">313</span>
<span id="L314" rel="#L314">314</span>
<span id="L315" rel="#L315">315</span>
<span id="L316" rel="#L316">316</span>
<span id="L317" rel="#L317">317</span>
<span id="L318" rel="#L318">318</span>
<span id="L319" rel="#L319">319</span>
<span id="L320" rel="#L320">320</span>
<span id="L321" rel="#L321">321</span>
<span id="L322" rel="#L322">322</span>
<span id="L323" rel="#L323">323</span>
<span id="L324" rel="#L324">324</span>
<span id="L325" rel="#L325">325</span>
<span id="L326" rel="#L326">326</span>
<span id="L327" rel="#L327">327</span>
<span id="L328" rel="#L328">328</span>
<span id="L329" rel="#L329">329</span>
<span id="L330" rel="#L330">330</span>
<span id="L331" rel="#L331">331</span>
<span id="L332" rel="#L332">332</span>
<span id="L333" rel="#L333">333</span>
<span id="L334" rel="#L334">334</span>
<span id="L335" rel="#L335">335</span>
<span id="L336" rel="#L336">336</span>
<span id="L337" rel="#L337">337</span>
<span id="L338" rel="#L338">338</span>
<span id="L339" rel="#L339">339</span>
<span id="L340" rel="#L340">340</span>
<span id="L341" rel="#L341">341</span>
<span id="L342" rel="#L342">342</span>
<span id="L343" rel="#L343">343</span>
<span id="L344" rel="#L344">344</span>
<span id="L345" rel="#L345">345</span>
<span id="L346" rel="#L346">346</span>
<span id="L347" rel="#L347">347</span>
<span id="L348" rel="#L348">348</span>
<span id="L349" rel="#L349">349</span>
<span id="L350" rel="#L350">350</span>
<span id="L351" rel="#L351">351</span>
<span id="L352" rel="#L352">352</span>
<span id="L353" rel="#L353">353</span>
<span id="L354" rel="#L354">354</span>
<span id="L355" rel="#L355">355</span>
<span id="L356" rel="#L356">356</span>
<span id="L357" rel="#L357">357</span>
<span id="L358" rel="#L358">358</span>
<span id="L359" rel="#L359">359</span>
<span id="L360" rel="#L360">360</span>
<span id="L361" rel="#L361">361</span>
<span id="L362" rel="#L362">362</span>
<span id="L363" rel="#L363">363</span>
<span id="L364" rel="#L364">364</span>
<span id="L365" rel="#L365">365</span>
<span id="L366" rel="#L366">366</span>
<span id="L367" rel="#L367">367</span>
<span id="L368" rel="#L368">368</span>
<span id="L369" rel="#L369">369</span>
<span id="L370" rel="#L370">370</span>
<span id="L371" rel="#L371">371</span>
<span id="L372" rel="#L372">372</span>
<span id="L373" rel="#L373">373</span>
<span id="L374" rel="#L374">374</span>
<span id="L375" rel="#L375">375</span>
<span id="L376" rel="#L376">376</span>
<span id="L377" rel="#L377">377</span>
<span id="L378" rel="#L378">378</span>
<span id="L379" rel="#L379">379</span>
<span id="L380" rel="#L380">380</span>
<span id="L381" rel="#L381">381</span>
<span id="L382" rel="#L382">382</span>
<span id="L383" rel="#L383">383</span>
<span id="L384" rel="#L384">384</span>
<span id="L385" rel="#L385">385</span>
<span id="L386" rel="#L386">386</span>
<span id="L387" rel="#L387">387</span>
<span id="L388" rel="#L388">388</span>
<span id="L389" rel="#L389">389</span>
<span id="L390" rel="#L390">390</span>
<span id="L391" rel="#L391">391</span>
<span id="L392" rel="#L392">392</span>
<span id="L393" rel="#L393">393</span>
<span id="L394" rel="#L394">394</span>
<span id="L395" rel="#L395">395</span>
<span id="L396" rel="#L396">396</span>
<span id="L397" rel="#L397">397</span>
<span id="L398" rel="#L398">398</span>
<span id="L399" rel="#L399">399</span>
<span id="L400" rel="#L400">400</span>
<span id="L401" rel="#L401">401</span>
<span id="L402" rel="#L402">402</span>
<span id="L403" rel="#L403">403</span>
<span id="L404" rel="#L404">404</span>
<span id="L405" rel="#L405">405</span>
<span id="L406" rel="#L406">406</span>
<span id="L407" rel="#L407">407</span>
<span id="L408" rel="#L408">408</span>
<span id="L409" rel="#L409">409</span>
<span id="L410" rel="#L410">410</span>
<span id="L411" rel="#L411">411</span>
<span id="L412" rel="#L412">412</span>
<span id="L413" rel="#L413">413</span>
<span id="L414" rel="#L414">414</span>
<span id="L415" rel="#L415">415</span>
<span id="L416" rel="#L416">416</span>
<span id="L417" rel="#L417">417</span>
<span id="L418" rel="#L418">418</span>
<span id="L419" rel="#L419">419</span>
<span id="L420" rel="#L420">420</span>
<span id="L421" rel="#L421">421</span>
<span id="L422" rel="#L422">422</span>
<span id="L423" rel="#L423">423</span>
<span id="L424" rel="#L424">424</span>
<span id="L425" rel="#L425">425</span>
<span id="L426" rel="#L426">426</span>
<span id="L427" rel="#L427">427</span>
<span id="L428" rel="#L428">428</span>
<span id="L429" rel="#L429">429</span>
<span id="L430" rel="#L430">430</span>
<span id="L431" rel="#L431">431</span>
<span id="L432" rel="#L432">432</span>
<span id="L433" rel="#L433">433</span>
<span id="L434" rel="#L434">434</span>
<span id="L435" rel="#L435">435</span>
<span id="L436" rel="#L436">436</span>
<span id="L437" rel="#L437">437</span>
<span id="L438" rel="#L438">438</span>
<span id="L439" rel="#L439">439</span>
<span id="L440" rel="#L440">440</span>
<span id="L441" rel="#L441">441</span>
<span id="L442" rel="#L442">442</span>
<span id="L443" rel="#L443">443</span>
<span id="L444" rel="#L444">444</span>
<span id="L445" rel="#L445">445</span>
<span id="L446" rel="#L446">446</span>
<span id="L447" rel="#L447">447</span>
<span id="L448" rel="#L448">448</span>
<span id="L449" rel="#L449">449</span>
<span id="L450" rel="#L450">450</span>
<span id="L451" rel="#L451">451</span>
<span id="L452" rel="#L452">452</span>
<span id="L453" rel="#L453">453</span>
<span id="L454" rel="#L454">454</span>
<span id="L455" rel="#L455">455</span>
<span id="L456" rel="#L456">456</span>
<span id="L457" rel="#L457">457</span>
<span id="L458" rel="#L458">458</span>
<span id="L459" rel="#L459">459</span>
<span id="L460" rel="#L460">460</span>
<span id="L461" rel="#L461">461</span>
<span id="L462" rel="#L462">462</span>
<span id="L463" rel="#L463">463</span>
<span id="L464" rel="#L464">464</span>
<span id="L465" rel="#L465">465</span>
<span id="L466" rel="#L466">466</span>
<span id="L467" rel="#L467">467</span>
<span id="L468" rel="#L468">468</span>
<span id="L469" rel="#L469">469</span>
<span id="L470" rel="#L470">470</span>
<span id="L471" rel="#L471">471</span>
<span id="L472" rel="#L472">472</span>
<span id="L473" rel="#L473">473</span>
<span id="L474" rel="#L474">474</span>
<span id="L475" rel="#L475">475</span>
<span id="L476" rel="#L476">476</span>
<span id="L477" rel="#L477">477</span>
<span id="L478" rel="#L478">478</span>
<span id="L479" rel="#L479">479</span>
<span id="L480" rel="#L480">480</span>
<span id="L481" rel="#L481">481</span>
<span id="L482" rel="#L482">482</span>
<span id="L483" rel="#L483">483</span>
<span id="L484" rel="#L484">484</span>
<span id="L485" rel="#L485">485</span>
<span id="L486" rel="#L486">486</span>
<span id="L487" rel="#L487">487</span>
<span id="L488" rel="#L488">488</span>
<span id="L489" rel="#L489">489</span>
<span id="L490" rel="#L490">490</span>
<span id="L491" rel="#L491">491</span>
<span id="L492" rel="#L492">492</span>
<span id="L493" rel="#L493">493</span>
<span id="L494" rel="#L494">494</span>
<span id="L495" rel="#L495">495</span>
<span id="L496" rel="#L496">496</span>
<span id="L497" rel="#L497">497</span>
<span id="L498" rel="#L498">498</span>
<span id="L499" rel="#L499">499</span>
<span id="L500" rel="#L500">500</span>
<span id="L501" rel="#L501">501</span>
<span id="L502" rel="#L502">502</span>
<span id="L503" rel="#L503">503</span>
<span id="L504" rel="#L504">504</span>
<span id="L505" rel="#L505">505</span>
<span id="L506" rel="#L506">506</span>
<span id="L507" rel="#L507">507</span>
<span id="L508" rel="#L508">508</span>
<span id="L509" rel="#L509">509</span>
<span id="L510" rel="#L510">510</span>
<span id="L511" rel="#L511">511</span>
<span id="L512" rel="#L512">512</span>
<span id="L513" rel="#L513">513</span>
<span id="L514" rel="#L514">514</span>
<span id="L515" rel="#L515">515</span>
<span id="L516" rel="#L516">516</span>
<span id="L517" rel="#L517">517</span>
<span id="L518" rel="#L518">518</span>
<span id="L519" rel="#L519">519</span>
<span id="L520" rel="#L520">520</span>
<span id="L521" rel="#L521">521</span>
<span id="L522" rel="#L522">522</span>
<span id="L523" rel="#L523">523</span>
<span id="L524" rel="#L524">524</span>
<span id="L525" rel="#L525">525</span>
<span id="L526" rel="#L526">526</span>
<span id="L527" rel="#L527">527</span>
<span id="L528" rel="#L528">528</span>
<span id="L529" rel="#L529">529</span>
<span id="L530" rel="#L530">530</span>
<span id="L531" rel="#L531">531</span>
<span id="L532" rel="#L532">532</span>
<span id="L533" rel="#L533">533</span>
<span id="L534" rel="#L534">534</span>
<span id="L535" rel="#L535">535</span>
<span id="L536" rel="#L536">536</span>
<span id="L537" rel="#L537">537</span>
<span id="L538" rel="#L538">538</span>
<span id="L539" rel="#L539">539</span>
<span id="L540" rel="#L540">540</span>
<span id="L541" rel="#L541">541</span>
<span id="L542" rel="#L542">542</span>
<span id="L543" rel="#L543">543</span>
<span id="L544" rel="#L544">544</span>
<span id="L545" rel="#L545">545</span>
<span id="L546" rel="#L546">546</span>
<span id="L547" rel="#L547">547</span>
<span id="L548" rel="#L548">548</span>
<span id="L549" rel="#L549">549</span>
<span id="L550" rel="#L550">550</span>
<span id="L551" rel="#L551">551</span>
<span id="L552" rel="#L552">552</span>
<span id="L553" rel="#L553">553</span>
<span id="L554" rel="#L554">554</span>
<span id="L555" rel="#L555">555</span>
<span id="L556" rel="#L556">556</span>
<span id="L557" rel="#L557">557</span>
<span id="L558" rel="#L558">558</span>
<span id="L559" rel="#L559">559</span>
<span id="L560" rel="#L560">560</span>
<span id="L561" rel="#L561">561</span>
<span id="L562" rel="#L562">562</span>
<span id="L563" rel="#L563">563</span>
<span id="L564" rel="#L564">564</span>
<span id="L565" rel="#L565">565</span>
<span id="L566" rel="#L566">566</span>
<span id="L567" rel="#L567">567</span>
<span id="L568" rel="#L568">568</span>
<span id="L569" rel="#L569">569</span>
<span id="L570" rel="#L570">570</span>
<span id="L571" rel="#L571">571</span>
<span id="L572" rel="#L572">572</span>
<span id="L573" rel="#L573">573</span>
<span id="L574" rel="#L574">574</span>
<span id="L575" rel="#L575">575</span>
<span id="L576" rel="#L576">576</span>
<span id="L577" rel="#L577">577</span>
<span id="L578" rel="#L578">578</span>
<span id="L579" rel="#L579">579</span>
<span id="L580" rel="#L580">580</span>
<span id="L581" rel="#L581">581</span>
<span id="L582" rel="#L582">582</span>
<span id="L583" rel="#L583">583</span>
<span id="L584" rel="#L584">584</span>
<span id="L585" rel="#L585">585</span>
<span id="L586" rel="#L586">586</span>
<span id="L587" rel="#L587">587</span>
<span id="L588" rel="#L588">588</span>
<span id="L589" rel="#L589">589</span>
<span id="L590" rel="#L590">590</span>
<span id="L591" rel="#L591">591</span>
<span id="L592" rel="#L592">592</span>
<span id="L593" rel="#L593">593</span>
<span id="L594" rel="#L594">594</span>
<span id="L595" rel="#L595">595</span>
<span id="L596" rel="#L596">596</span>
<span id="L597" rel="#L597">597</span>
<span id="L598" rel="#L598">598</span>
<span id="L599" rel="#L599">599</span>
<span id="L600" rel="#L600">600</span>
<span id="L601" rel="#L601">601</span>
<span id="L602" rel="#L602">602</span>
<span id="L603" rel="#L603">603</span>
<span id="L604" rel="#L604">604</span>
<span id="L605" rel="#L605">605</span>
<span id="L606" rel="#L606">606</span>
<span id="L607" rel="#L607">607</span>
<span id="L608" rel="#L608">608</span>
<span id="L609" rel="#L609">609</span>
<span id="L610" rel="#L610">610</span>
<span id="L611" rel="#L611">611</span>
<span id="L612" rel="#L612">612</span>
<span id="L613" rel="#L613">613</span>
<span id="L614" rel="#L614">614</span>
<span id="L615" rel="#L615">615</span>
<span id="L616" rel="#L616">616</span>
<span id="L617" rel="#L617">617</span>
<span id="L618" rel="#L618">618</span>
<span id="L619" rel="#L619">619</span>
<span id="L620" rel="#L620">620</span>
<span id="L621" rel="#L621">621</span>
<span id="L622" rel="#L622">622</span>
<span id="L623" rel="#L623">623</span>
<span id="L624" rel="#L624">624</span>
<span id="L625" rel="#L625">625</span>
<span id="L626" rel="#L626">626</span>
<span id="L627" rel="#L627">627</span>
<span id="L628" rel="#L628">628</span>
<span id="L629" rel="#L629">629</span>
<span id="L630" rel="#L630">630</span>
<span id="L631" rel="#L631">631</span>
<span id="L632" rel="#L632">632</span>
<span id="L633" rel="#L633">633</span>
<span id="L634" rel="#L634">634</span>
<span id="L635" rel="#L635">635</span>
<span id="L636" rel="#L636">636</span>
<span id="L637" rel="#L637">637</span>
<span id="L638" rel="#L638">638</span>
<span id="L639" rel="#L639">639</span>
<span id="L640" rel="#L640">640</span>
<span id="L641" rel="#L641">641</span>
<span id="L642" rel="#L642">642</span>
<span id="L643" rel="#L643">643</span>
<span id="L644" rel="#L644">644</span>
<span id="L645" rel="#L645">645</span>
<span id="L646" rel="#L646">646</span>
<span id="L647" rel="#L647">647</span>
<span id="L648" rel="#L648">648</span>
<span id="L649" rel="#L649">649</span>
<span id="L650" rel="#L650">650</span>
<span id="L651" rel="#L651">651</span>
<span id="L652" rel="#L652">652</span>
<span id="L653" rel="#L653">653</span>
<span id="L654" rel="#L654">654</span>
<span id="L655" rel="#L655">655</span>
<span id="L656" rel="#L656">656</span>
<span id="L657" rel="#L657">657</span>
<span id="L658" rel="#L658">658</span>
<span id="L659" rel="#L659">659</span>
<span id="L660" rel="#L660">660</span>
<span id="L661" rel="#L661">661</span>
<span id="L662" rel="#L662">662</span>
<span id="L663" rel="#L663">663</span>
<span id="L664" rel="#L664">664</span>
<span id="L665" rel="#L665">665</span>
<span id="L666" rel="#L666">666</span>
<span id="L667" rel="#L667">667</span>
<span id="L668" rel="#L668">668</span>
<span id="L669" rel="#L669">669</span>
<span id="L670" rel="#L670">670</span>
<span id="L671" rel="#L671">671</span>
<span id="L672" rel="#L672">672</span>
<span id="L673" rel="#L673">673</span>
<span id="L674" rel="#L674">674</span>
<span id="L675" rel="#L675">675</span>
<span id="L676" rel="#L676">676</span>
<span id="L677" rel="#L677">677</span>
<span id="L678" rel="#L678">678</span>
<span id="L679" rel="#L679">679</span>
<span id="L680" rel="#L680">680</span>
<span id="L681" rel="#L681">681</span>
<span id="L682" rel="#L682">682</span>
<span id="L683" rel="#L683">683</span>
<span id="L684" rel="#L684">684</span>
<span id="L685" rel="#L685">685</span>
<span id="L686" rel="#L686">686</span>
<span id="L687" rel="#L687">687</span>
<span id="L688" rel="#L688">688</span>
<span id="L689" rel="#L689">689</span>
<span id="L690" rel="#L690">690</span>
<span id="L691" rel="#L691">691</span>
<span id="L692" rel="#L692">692</span>
<span id="L693" rel="#L693">693</span>
<span id="L694" rel="#L694">694</span>
<span id="L695" rel="#L695">695</span>
<span id="L696" rel="#L696">696</span>
<span id="L697" rel="#L697">697</span>
<span id="L698" rel="#L698">698</span>
<span id="L699" rel="#L699">699</span>
<span id="L700" rel="#L700">700</span>
<span id="L701" rel="#L701">701</span>
<span id="L702" rel="#L702">702</span>
<span id="L703" rel="#L703">703</span>
<span id="L704" rel="#L704">704</span>
<span id="L705" rel="#L705">705</span>
<span id="L706" rel="#L706">706</span>
<span id="L707" rel="#L707">707</span>
<span id="L708" rel="#L708">708</span>
<span id="L709" rel="#L709">709</span>
<span id="L710" rel="#L710">710</span>
<span id="L711" rel="#L711">711</span>
<span id="L712" rel="#L712">712</span>
<span id="L713" rel="#L713">713</span>
<span id="L714" rel="#L714">714</span>
<span id="L715" rel="#L715">715</span>
<span id="L716" rel="#L716">716</span>
<span id="L717" rel="#L717">717</span>
<span id="L718" rel="#L718">718</span>
<span id="L719" rel="#L719">719</span>
<span id="L720" rel="#L720">720</span>
<span id="L721" rel="#L721">721</span>
<span id="L722" rel="#L722">722</span>
<span id="L723" rel="#L723">723</span>
<span id="L724" rel="#L724">724</span>
<span id="L725" rel="#L725">725</span>
<span id="L726" rel="#L726">726</span>
<span id="L727" rel="#L727">727</span>
<span id="L728" rel="#L728">728</span>
<span id="L729" rel="#L729">729</span>
<span id="L730" rel="#L730">730</span>
<span id="L731" rel="#L731">731</span>
<span id="L732" rel="#L732">732</span>
<span id="L733" rel="#L733">733</span>
<span id="L734" rel="#L734">734</span>
<span id="L735" rel="#L735">735</span>
<span id="L736" rel="#L736">736</span>
<span id="L737" rel="#L737">737</span>
<span id="L738" rel="#L738">738</span>
<span id="L739" rel="#L739">739</span>
<span id="L740" rel="#L740">740</span>
<span id="L741" rel="#L741">741</span>
<span id="L742" rel="#L742">742</span>
<span id="L743" rel="#L743">743</span>
<span id="L744" rel="#L744">744</span>
<span id="L745" rel="#L745">745</span>
<span id="L746" rel="#L746">746</span>
<span id="L747" rel="#L747">747</span>
<span id="L748" rel="#L748">748</span>
<span id="L749" rel="#L749">749</span>
<span id="L750" rel="#L750">750</span>
<span id="L751" rel="#L751">751</span>
<span id="L752" rel="#L752">752</span>
<span id="L753" rel="#L753">753</span>
<span id="L754" rel="#L754">754</span>
<span id="L755" rel="#L755">755</span>
<span id="L756" rel="#L756">756</span>
<span id="L757" rel="#L757">757</span>
<span id="L758" rel="#L758">758</span>
<span id="L759" rel="#L759">759</span>
<span id="L760" rel="#L760">760</span>
<span id="L761" rel="#L761">761</span>
<span id="L762" rel="#L762">762</span>
<span id="L763" rel="#L763">763</span>
<span id="L764" rel="#L764">764</span>
<span id="L765" rel="#L765">765</span>
<span id="L766" rel="#L766">766</span>
<span id="L767" rel="#L767">767</span>
<span id="L768" rel="#L768">768</span>
<span id="L769" rel="#L769">769</span>
<span id="L770" rel="#L770">770</span>
<span id="L771" rel="#L771">771</span>
<span id="L772" rel="#L772">772</span>
<span id="L773" rel="#L773">773</span>
<span id="L774" rel="#L774">774</span>
<span id="L775" rel="#L775">775</span>
<span id="L776" rel="#L776">776</span>
<span id="L777" rel="#L777">777</span>
<span id="L778" rel="#L778">778</span>
<span id="L779" rel="#L779">779</span>
<span id="L780" rel="#L780">780</span>
<span id="L781" rel="#L781">781</span>
<span id="L782" rel="#L782">782</span>
<span id="L783" rel="#L783">783</span>
<span id="L784" rel="#L784">784</span>
<span id="L785" rel="#L785">785</span>
<span id="L786" rel="#L786">786</span>
<span id="L787" rel="#L787">787</span>
<span id="L788" rel="#L788">788</span>
<span id="L789" rel="#L789">789</span>
<span id="L790" rel="#L790">790</span>
<span id="L791" rel="#L791">791</span>
<span id="L792" rel="#L792">792</span>
<span id="L793" rel="#L793">793</span>
<span id="L794" rel="#L794">794</span>
<span id="L795" rel="#L795">795</span>
<span id="L796" rel="#L796">796</span>
<span id="L797" rel="#L797">797</span>
<span id="L798" rel="#L798">798</span>
<span id="L799" rel="#L799">799</span>
<span id="L800" rel="#L800">800</span>
<span id="L801" rel="#L801">801</span>
<span id="L802" rel="#L802">802</span>
<span id="L803" rel="#L803">803</span>
<span id="L804" rel="#L804">804</span>
<span id="L805" rel="#L805">805</span>
<span id="L806" rel="#L806">806</span>
<span id="L807" rel="#L807">807</span>
<span id="L808" rel="#L808">808</span>
<span id="L809" rel="#L809">809</span>
<span id="L810" rel="#L810">810</span>
<span id="L811" rel="#L811">811</span>
<span id="L812" rel="#L812">812</span>
<span id="L813" rel="#L813">813</span>
<span id="L814" rel="#L814">814</span>
<span id="L815" rel="#L815">815</span>
<span id="L816" rel="#L816">816</span>
<span id="L817" rel="#L817">817</span>
<span id="L818" rel="#L818">818</span>
<span id="L819" rel="#L819">819</span>
<span id="L820" rel="#L820">820</span>
<span id="L821" rel="#L821">821</span>
<span id="L822" rel="#L822">822</span>
<span id="L823" rel="#L823">823</span>
<span id="L824" rel="#L824">824</span>
<span id="L825" rel="#L825">825</span>
<span id="L826" rel="#L826">826</span>
<span id="L827" rel="#L827">827</span>
<span id="L828" rel="#L828">828</span>
<span id="L829" rel="#L829">829</span>
<span id="L830" rel="#L830">830</span>
<span id="L831" rel="#L831">831</span>
<span id="L832" rel="#L832">832</span>
<span id="L833" rel="#L833">833</span>
<span id="L834" rel="#L834">834</span>
<span id="L835" rel="#L835">835</span>
<span id="L836" rel="#L836">836</span>
<span id="L837" rel="#L837">837</span>
<span id="L838" rel="#L838">838</span>
<span id="L839" rel="#L839">839</span>
<span id="L840" rel="#L840">840</span>
<span id="L841" rel="#L841">841</span>
<span id="L842" rel="#L842">842</span>
<span id="L843" rel="#L843">843</span>
<span id="L844" rel="#L844">844</span>
<span id="L845" rel="#L845">845</span>
<span id="L846" rel="#L846">846</span>
<span id="L847" rel="#L847">847</span>
<span id="L848" rel="#L848">848</span>
<span id="L849" rel="#L849">849</span>
<span id="L850" rel="#L850">850</span>
<span id="L851" rel="#L851">851</span>
<span id="L852" rel="#L852">852</span>
<span id="L853" rel="#L853">853</span>
<span id="L854" rel="#L854">854</span>
<span id="L855" rel="#L855">855</span>
<span id="L856" rel="#L856">856</span>
<span id="L857" rel="#L857">857</span>
<span id="L858" rel="#L858">858</span>
<span id="L859" rel="#L859">859</span>
<span id="L860" rel="#L860">860</span>
<span id="L861" rel="#L861">861</span>
<span id="L862" rel="#L862">862</span>
<span id="L863" rel="#L863">863</span>
<span id="L864" rel="#L864">864</span>
<span id="L865" rel="#L865">865</span>
<span id="L866" rel="#L866">866</span>
<span id="L867" rel="#L867">867</span>
<span id="L868" rel="#L868">868</span>
<span id="L869" rel="#L869">869</span>
<span id="L870" rel="#L870">870</span>
<span id="L871" rel="#L871">871</span>
<span id="L872" rel="#L872">872</span>
<span id="L873" rel="#L873">873</span>
<span id="L874" rel="#L874">874</span>
<span id="L875" rel="#L875">875</span>
<span id="L876" rel="#L876">876</span>
<span id="L877" rel="#L877">877</span>
<span id="L878" rel="#L878">878</span>
<span id="L879" rel="#L879">879</span>
<span id="L880" rel="#L880">880</span>
<span id="L881" rel="#L881">881</span>
<span id="L882" rel="#L882">882</span>
<span id="L883" rel="#L883">883</span>
<span id="L884" rel="#L884">884</span>
<span id="L885" rel="#L885">885</span>
<span id="L886" rel="#L886">886</span>
<span id="L887" rel="#L887">887</span>
<span id="L888" rel="#L888">888</span>
<span id="L889" rel="#L889">889</span>
<span id="L890" rel="#L890">890</span>
<span id="L891" rel="#L891">891</span>
<span id="L892" rel="#L892">892</span>
<span id="L893" rel="#L893">893</span>
<span id="L894" rel="#L894">894</span>
<span id="L895" rel="#L895">895</span>
<span id="L896" rel="#L896">896</span>
<span id="L897" rel="#L897">897</span>
<span id="L898" rel="#L898">898</span>
<span id="L899" rel="#L899">899</span>
<span id="L900" rel="#L900">900</span>
<span id="L901" rel="#L901">901</span>
<span id="L902" rel="#L902">902</span>
<span id="L903" rel="#L903">903</span>
<span id="L904" rel="#L904">904</span>
<span id="L905" rel="#L905">905</span>
<span id="L906" rel="#L906">906</span>
<span id="L907" rel="#L907">907</span>
<span id="L908" rel="#L908">908</span>
<span id="L909" rel="#L909">909</span>
<span id="L910" rel="#L910">910</span>
<span id="L911" rel="#L911">911</span>
<span id="L912" rel="#L912">912</span>
<span id="L913" rel="#L913">913</span>
<span id="L914" rel="#L914">914</span>
<span id="L915" rel="#L915">915</span>
<span id="L916" rel="#L916">916</span>
<span id="L917" rel="#L917">917</span>
<span id="L918" rel="#L918">918</span>
<span id="L919" rel="#L919">919</span>
<span id="L920" rel="#L920">920</span>
<span id="L921" rel="#L921">921</span>
<span id="L922" rel="#L922">922</span>
<span id="L923" rel="#L923">923</span>
<span id="L924" rel="#L924">924</span>
<span id="L925" rel="#L925">925</span>
<span id="L926" rel="#L926">926</span>
<span id="L927" rel="#L927">927</span>
<span id="L928" rel="#L928">928</span>
<span id="L929" rel="#L929">929</span>
<span id="L930" rel="#L930">930</span>
<span id="L931" rel="#L931">931</span>
<span id="L932" rel="#L932">932</span>
<span id="L933" rel="#L933">933</span>
<span id="L934" rel="#L934">934</span>
<span id="L935" rel="#L935">935</span>
<span id="L936" rel="#L936">936</span>
<span id="L937" rel="#L937">937</span>
<span id="L938" rel="#L938">938</span>
<span id="L939" rel="#L939">939</span>
<span id="L940" rel="#L940">940</span>
<span id="L941" rel="#L941">941</span>
<span id="L942" rel="#L942">942</span>
<span id="L943" rel="#L943">943</span>
<span id="L944" rel="#L944">944</span>
<span id="L945" rel="#L945">945</span>
<span id="L946" rel="#L946">946</span>
<span id="L947" rel="#L947">947</span>
<span id="L948" rel="#L948">948</span>
<span id="L949" rel="#L949">949</span>
<span id="L950" rel="#L950">950</span>
<span id="L951" rel="#L951">951</span>
<span id="L952" rel="#L952">952</span>
<span id="L953" rel="#L953">953</span>
<span id="L954" rel="#L954">954</span>

          </td>
          <td class="blob-line-code">
                  <div class="highlight"><pre><div class='line' id='LC1'>// Type definitions for jQueryUI 1.9</div><div class='line' id='LC2'>// Project: http://jqueryui.com/</div><div class='line' id='LC3'>// Definitions by: Boris Yankov &lt;https://github.com/borisyankov/&gt;</div><div class='line' id='LC4'>// Definitions: https://github.com/borisyankov/DefinitelyTyped</div><div class='line' id='LC5'><br/></div><div class='line' id='LC6'><br/></div><div class='line' id='LC7'>/// &lt;reference path=&quot;../jquery/jquery.d.ts&quot;/&gt;</div><div class='line' id='LC8'><br/></div><div class='line' id='LC9'><br/></div><div class='line' id='LC10'>// Accordion //////////////////////////////////////////////////</div><div class='line' id='LC11'><br/></div><div class='line' id='LC12'>interface AccordionOptions {</div><div class='line' id='LC13'>&nbsp;&nbsp;&nbsp;&nbsp;active?: any; // bool or number</div><div class='line' id='LC14'>&nbsp;&nbsp;&nbsp;&nbsp;animate?: any; // bool, number, string or object</div><div class='line' id='LC15'>&nbsp;&nbsp;&nbsp;&nbsp;collapsible?: bool;</div><div class='line' id='LC16'>&nbsp;&nbsp;&nbsp;&nbsp;disabled?: bool;</div><div class='line' id='LC17'>&nbsp;&nbsp;&nbsp;&nbsp;event?: string;</div><div class='line' id='LC18'>&nbsp;&nbsp;&nbsp;&nbsp;header?: string;</div><div class='line' id='LC19'>&nbsp;&nbsp;&nbsp;&nbsp;heightStyle?: string;</div><div class='line' id='LC20'>&nbsp;&nbsp;&nbsp;&nbsp;icons?: any;</div><div class='line' id='LC21'>}</div><div class='line' id='LC22'><br/></div><div class='line' id='LC23'>interface AccordionUIParams {</div><div class='line' id='LC24'>&nbsp;&nbsp;&nbsp;&nbsp;newHeader: JQuery;</div><div class='line' id='LC25'>&nbsp;&nbsp;&nbsp;&nbsp;oldHeader: JQuery;</div><div class='line' id='LC26'>&nbsp;&nbsp;&nbsp;&nbsp;newPanel: JQuery;</div><div class='line' id='LC27'>&nbsp;&nbsp;&nbsp;&nbsp;oldPanel: JQuery;</div><div class='line' id='LC28'>}</div><div class='line' id='LC29'><br/></div><div class='line' id='LC30'>interface AccordionEvent {</div><div class='line' id='LC31'>&nbsp;&nbsp;&nbsp;&nbsp;(event: Event, ui: AccordionUIParams): void;</div><div class='line' id='LC32'>}</div><div class='line' id='LC33'><br/></div><div class='line' id='LC34'>interface AccordionEvents {</div><div class='line' id='LC35'>&nbsp;&nbsp;&nbsp;&nbsp;activate?: AccordionEvent;</div><div class='line' id='LC36'>&nbsp;&nbsp;&nbsp;&nbsp;beforeActivate?: AccordionEvent;</div><div class='line' id='LC37'>&nbsp;&nbsp;&nbsp;&nbsp;create?: AccordionEvent;</div><div class='line' id='LC38'>}</div><div class='line' id='LC39'><br/></div><div class='line' id='LC40'>interface Accordion extends Widget, AccordionOptions, AccordionEvents {</div><div class='line' id='LC41'>}</div><div class='line' id='LC42'><br/></div><div class='line' id='LC43'><br/></div><div class='line' id='LC44'>// Autocomplete //////////////////////////////////////////////////</div><div class='line' id='LC45'><br/></div><div class='line' id='LC46'>interface AutocompleteOptions {</div><div class='line' id='LC47'>&nbsp;&nbsp;&nbsp;&nbsp;appendTo?: any; //Selector;</div><div class='line' id='LC48'>&nbsp;&nbsp;&nbsp;&nbsp;autoFocus?: bool;</div><div class='line' id='LC49'>&nbsp;&nbsp;&nbsp;&nbsp;delay?: number;</div><div class='line' id='LC50'>&nbsp;&nbsp;&nbsp;&nbsp;disabled?: bool;</div><div class='line' id='LC51'>&nbsp;&nbsp;&nbsp;&nbsp;minLength?: number;</div><div class='line' id='LC52'>&nbsp;&nbsp;&nbsp;&nbsp;position?: string;</div><div class='line' id='LC53'>&nbsp;&nbsp;&nbsp;&nbsp;source?: any; // [], string or ()</div><div class='line' id='LC54'>}</div><div class='line' id='LC55'><br/></div><div class='line' id='LC56'>interface AutocompleteUIParams {</div><div class='line' id='LC57'><br/></div><div class='line' id='LC58'>}</div><div class='line' id='LC59'><br/></div><div class='line' id='LC60'>interface AuotcompleteEvent {</div><div class='line' id='LC61'>&nbsp;&nbsp;&nbsp;&nbsp;(event: Event, ui: AutocompleteUIParams): void;</div><div class='line' id='LC62'>}</div><div class='line' id='LC63'><br/></div><div class='line' id='LC64'>interface AutocompleteEvents {</div><div class='line' id='LC65'>&nbsp;&nbsp;&nbsp;&nbsp;change?: AuotcompleteEvent;</div><div class='line' id='LC66'>&nbsp;&nbsp;&nbsp;&nbsp;close?: AuotcompleteEvent;</div><div class='line' id='LC67'>&nbsp;&nbsp;&nbsp;&nbsp;create?: AuotcompleteEvent;</div><div class='line' id='LC68'>&nbsp;&nbsp;&nbsp;&nbsp;focus?: AuotcompleteEvent;</div><div class='line' id='LC69'>&nbsp;&nbsp;&nbsp;&nbsp;open?: AuotcompleteEvent;</div><div class='line' id='LC70'>&nbsp;&nbsp;&nbsp;&nbsp;response?: AuotcompleteEvent;</div><div class='line' id='LC71'>&nbsp;&nbsp;&nbsp;&nbsp;search?: AuotcompleteEvent;</div><div class='line' id='LC72'>&nbsp;&nbsp;&nbsp;&nbsp;select?: AuotcompleteEvent;</div><div class='line' id='LC73'>}</div><div class='line' id='LC74'><br/></div><div class='line' id='LC75'>interface Autocomplete extends Widget, AutocompleteOptions, AutocompleteEvents {</div><div class='line' id='LC76'>&nbsp;&nbsp;&nbsp;&nbsp;escapeRegex: (string) =&gt; string;</div><div class='line' id='LC77'>}</div><div class='line' id='LC78'><br/></div><div class='line' id='LC79'><br/></div><div class='line' id='LC80'>// Button //////////////////////////////////////////////////</div><div class='line' id='LC81'><br/></div><div class='line' id='LC82'>interface ButtonOptions {</div><div class='line' id='LC83'>&nbsp;&nbsp;&nbsp;&nbsp;disabled?: bool;</div><div class='line' id='LC84'>&nbsp;&nbsp;&nbsp;&nbsp;icons?: any;</div><div class='line' id='LC85'>&nbsp;&nbsp;&nbsp;&nbsp;label?: string;</div><div class='line' id='LC86'>&nbsp;&nbsp;&nbsp;&nbsp;text?: bool;</div><div class='line' id='LC87'>}</div><div class='line' id='LC88'><br/></div><div class='line' id='LC89'>interface Button extends Widget, ButtonOptions {</div><div class='line' id='LC90'>}</div><div class='line' id='LC91'><br/></div><div class='line' id='LC92'><br/></div><div class='line' id='LC93'>// Datepicker //////////////////////////////////////////////////</div><div class='line' id='LC94'><br/></div><div class='line' id='LC95'>interface DatepickerOptions {</div><div class='line' id='LC96'>&nbsp;&nbsp;&nbsp;&nbsp;altFieldType?: any; // Selecotr, jQuery or Element</div><div class='line' id='LC97'>&nbsp;&nbsp;&nbsp;&nbsp;altFormat?: string;</div><div class='line' id='LC98'>&nbsp;&nbsp;&nbsp;&nbsp;appendText?: string;</div><div class='line' id='LC99'>&nbsp;&nbsp;&nbsp;&nbsp;autoSize?: bool;</div><div class='line' id='LC100'>&nbsp;&nbsp;&nbsp;&nbsp;beforeShow?: (input: Element, inst: any) =&gt; void;</div><div class='line' id='LC101'>&nbsp;&nbsp;&nbsp;&nbsp;beforeShowDay?: (date: Date) =&gt; void;</div><div class='line' id='LC102'>&nbsp;&nbsp;&nbsp;&nbsp;buttonImage?: string;</div><div class='line' id='LC103'>&nbsp;&nbsp;&nbsp;&nbsp;buttonImageOnly?: bool;</div><div class='line' id='LC104'>&nbsp;&nbsp;&nbsp;&nbsp;buttonText?: string;</div><div class='line' id='LC105'>&nbsp;&nbsp;&nbsp;&nbsp;calculateWeek?: () =&gt; any;</div><div class='line' id='LC106'>&nbsp;&nbsp;&nbsp;&nbsp;changeMonth?: bool;</div><div class='line' id='LC107'>&nbsp;&nbsp;&nbsp;&nbsp;changeYear?: bool;</div><div class='line' id='LC108'>&nbsp;&nbsp;&nbsp;&nbsp;closeText?: string;</div><div class='line' id='LC109'>&nbsp;&nbsp;&nbsp;&nbsp;constrainInput?: bool;</div><div class='line' id='LC110'>&nbsp;&nbsp;&nbsp;&nbsp;currentText?: string;</div><div class='line' id='LC111'>&nbsp;&nbsp;&nbsp;&nbsp;dateFormat?: string;</div><div class='line' id='LC112'>&nbsp;&nbsp;&nbsp;&nbsp;dayNames?: string[];</div><div class='line' id='LC113'>&nbsp;&nbsp;&nbsp;&nbsp;dayNamesMin?: string[];</div><div class='line' id='LC114'>&nbsp;&nbsp;&nbsp;&nbsp;dayNamesShort?: string[];</div><div class='line' id='LC115'>&nbsp;&nbsp;&nbsp;&nbsp;defaultDateType?: any; // Date, number or string</div><div class='line' id='LC116'>&nbsp;&nbsp;&nbsp;&nbsp;duration?: string;</div><div class='line' id='LC117'>&nbsp;&nbsp;&nbsp;&nbsp;firstDay?: number;</div><div class='line' id='LC118'>&nbsp;&nbsp;&nbsp;&nbsp;gotoCurrent?: bool;</div><div class='line' id='LC119'>&nbsp;&nbsp;&nbsp;&nbsp;hideIfNoPrevNext?: bool;</div><div class='line' id='LC120'>&nbsp;&nbsp;&nbsp;&nbsp;isRTL?: bool;</div><div class='line' id='LC121'>&nbsp;&nbsp;&nbsp;&nbsp;maxDate?: any; // Date, number or string</div><div class='line' id='LC122'>&nbsp;&nbsp;&nbsp;&nbsp;minDate?: any; // Date, number or string</div><div class='line' id='LC123'>&nbsp;&nbsp;&nbsp;&nbsp;monthNames?: string[];</div><div class='line' id='LC124'>&nbsp;&nbsp;&nbsp;&nbsp;monthNamesShort?: string[];</div><div class='line' id='LC125'>&nbsp;&nbsp;&nbsp;&nbsp;navigationAsDateFormat?: bool;</div><div class='line' id='LC126'>&nbsp;&nbsp;&nbsp;&nbsp;nextText?: string;</div><div class='line' id='LC127'>&nbsp;&nbsp;&nbsp;&nbsp;numberOfMonths?: any; // number or []</div><div class='line' id='LC128'>&nbsp;&nbsp;&nbsp;&nbsp;onChangeMonthYear?: (year: number, month: number, inst: any) =&gt; void;</div><div class='line' id='LC129'>&nbsp;&nbsp;&nbsp;&nbsp;onClose?: (dateText: string, inst: any) =&gt; void;</div><div class='line' id='LC130'>&nbsp;&nbsp;&nbsp;&nbsp;onSelect?: (dateText: string, inst: any) =&gt; void;</div><div class='line' id='LC131'>&nbsp;&nbsp;&nbsp;&nbsp;prevText?: string;</div><div class='line' id='LC132'>&nbsp;&nbsp;&nbsp;&nbsp;selectOtherMonths?: bool;</div><div class='line' id='LC133'>&nbsp;&nbsp;&nbsp;&nbsp;shortYearCutoff?: any; // number or string</div><div class='line' id='LC134'>&nbsp;&nbsp;&nbsp;&nbsp;showAnim?: string;</div><div class='line' id='LC135'>&nbsp;&nbsp;&nbsp;&nbsp;showButtonPanel?: bool;</div><div class='line' id='LC136'>&nbsp;&nbsp;&nbsp;&nbsp;showCurrentAtPos?: number;</div><div class='line' id='LC137'>&nbsp;&nbsp;&nbsp;&nbsp;showMonthAfterYear?: bool;</div><div class='line' id='LC138'>&nbsp;&nbsp;&nbsp;&nbsp;showOn?: string;</div><div class='line' id='LC139'>&nbsp;&nbsp;&nbsp;&nbsp;showOptions?: any; // TODO</div><div class='line' id='LC140'>&nbsp;&nbsp;&nbsp;&nbsp;showOtherMonths?: bool;</div><div class='line' id='LC141'>&nbsp;&nbsp;&nbsp;&nbsp;showWeek?: bool;</div><div class='line' id='LC142'>&nbsp;&nbsp;&nbsp;&nbsp;stepMonths?: number;</div><div class='line' id='LC143'>&nbsp;&nbsp;&nbsp;&nbsp;weekHeader?: string;</div><div class='line' id='LC144'>&nbsp;&nbsp;&nbsp;&nbsp;yearRange?: string;</div><div class='line' id='LC145'>&nbsp;&nbsp;&nbsp;&nbsp;yearSuffix?: string;</div><div class='line' id='LC146'>}</div><div class='line' id='LC147'><br/></div><div class='line' id='LC148'>interface DatepickerFormatDateOptions {</div><div class='line' id='LC149'>&nbsp;&nbsp;&nbsp;&nbsp;dayNamesShort?: string[];</div><div class='line' id='LC150'>&nbsp;&nbsp;&nbsp;&nbsp;dayNames?: string[];</div><div class='line' id='LC151'>&nbsp;&nbsp;&nbsp;&nbsp;monthNamesShort?: string[];</div><div class='line' id='LC152'>&nbsp;&nbsp;&nbsp;&nbsp;monthNames?: string[];</div><div class='line' id='LC153'>}</div><div class='line' id='LC154'><br/></div><div class='line' id='LC155'>interface Datepicker extends Widget, DatepickerOptions {</div><div class='line' id='LC156'>&nbsp;&nbsp;&nbsp;&nbsp;regional: { [languageCod3: string]: any; };</div><div class='line' id='LC157'>&nbsp;&nbsp;&nbsp;&nbsp;setDefaults(defaults: DatepickerOptions);</div><div class='line' id='LC158'>&nbsp;&nbsp;&nbsp;&nbsp;formatDate(format: string, date: Date, settings?: DatepickerFormatDateOptions): string;</div><div class='line' id='LC159'>&nbsp;&nbsp;&nbsp;&nbsp;parseDate(format: string, date: string, settings?: DatepickerFormatDateOptions): Date;</div><div class='line' id='LC160'>&nbsp;&nbsp;&nbsp;&nbsp;iso8601Week(date: Date): void;</div><div class='line' id='LC161'>&nbsp;&nbsp;&nbsp;&nbsp;noWeekends(): void;</div><div class='line' id='LC162'>}</div><div class='line' id='LC163'><br/></div><div class='line' id='LC164'><br/></div><div class='line' id='LC165'>// Dialog //////////////////////////////////////////////////</div><div class='line' id='LC166'><br/></div><div class='line' id='LC167'>interface DialogOptions {</div><div class='line' id='LC168'>&nbsp;&nbsp;&nbsp;&nbsp;autoOpen?: bool;</div><div class='line' id='LC169'>&nbsp;&nbsp;&nbsp;&nbsp;buttons?: any; // object or []</div><div class='line' id='LC170'>&nbsp;&nbsp;&nbsp;&nbsp;closeOnEscape?: bool;</div><div class='line' id='LC171'>&nbsp;&nbsp;&nbsp;&nbsp;closeText?: string;</div><div class='line' id='LC172'>&nbsp;&nbsp;&nbsp;&nbsp;dialogClass?: string;</div><div class='line' id='LC173'>&nbsp;&nbsp;&nbsp;&nbsp;disabled?: bool;</div><div class='line' id='LC174'>&nbsp;&nbsp;&nbsp;&nbsp;draggable?: bool;</div><div class='line' id='LC175'>&nbsp;&nbsp;&nbsp;&nbsp;height?: any; // number or string</div><div class='line' id='LC176'>&nbsp;&nbsp;&nbsp;&nbsp;maxHeight?: number;</div><div class='line' id='LC177'>&nbsp;&nbsp;&nbsp;&nbsp;maxWidth?: number;</div><div class='line' id='LC178'>&nbsp;&nbsp;&nbsp;&nbsp;minHeight?: number;</div><div class='line' id='LC179'>&nbsp;&nbsp;&nbsp;&nbsp;minWidth?: number;</div><div class='line' id='LC180'>&nbsp;&nbsp;&nbsp;&nbsp;modal?: bool;</div><div class='line' id='LC181'>&nbsp;&nbsp;&nbsp;&nbsp;position?: any; // object, string or []</div><div class='line' id='LC182'>&nbsp;&nbsp;&nbsp;&nbsp;resizable?: bool;</div><div class='line' id='LC183'>&nbsp;&nbsp;&nbsp;&nbsp;show?: any; // number, string or object</div><div class='line' id='LC184'>&nbsp;&nbsp;&nbsp;&nbsp;stack?: bool;</div><div class='line' id='LC185'>&nbsp;&nbsp;&nbsp;&nbsp;title?: string;</div><div class='line' id='LC186'>&nbsp;&nbsp;&nbsp;&nbsp;width?: any; // number or string</div><div class='line' id='LC187'>&nbsp;&nbsp;&nbsp;&nbsp;zIndex?: number;</div><div class='line' id='LC188'>}</div><div class='line' id='LC189'><br/></div><div class='line' id='LC190'>interface DialogUIParams {</div><div class='line' id='LC191'>}</div><div class='line' id='LC192'><br/></div><div class='line' id='LC193'>interface DialogEvent {</div><div class='line' id='LC194'>&nbsp;&nbsp;&nbsp;&nbsp;(event: Event, ui: DialogUIParams): void;</div><div class='line' id='LC195'>}</div><div class='line' id='LC196'><br/></div><div class='line' id='LC197'>interface DialogEvents {</div><div class='line' id='LC198'>&nbsp;&nbsp;&nbsp;&nbsp;beforeClose?: DialogEvent;</div><div class='line' id='LC199'>&nbsp;&nbsp;&nbsp;&nbsp;close?: DialogEvent;</div><div class='line' id='LC200'>&nbsp;&nbsp;&nbsp;&nbsp;create?: DialogEvent;</div><div class='line' id='LC201'>&nbsp;&nbsp;&nbsp;&nbsp;drag?: DialogEvent;</div><div class='line' id='LC202'>&nbsp;&nbsp;&nbsp;&nbsp;dragStart?: DialogEvent;</div><div class='line' id='LC203'>&nbsp;&nbsp;&nbsp;&nbsp;dragStop?: DialogEvent;</div><div class='line' id='LC204'>&nbsp;&nbsp;&nbsp;&nbsp;focus?: DialogEvent;</div><div class='line' id='LC205'>&nbsp;&nbsp;&nbsp;&nbsp;open?: DialogEvent;</div><div class='line' id='LC206'>&nbsp;&nbsp;&nbsp;&nbsp;resize?: DialogEvent;</div><div class='line' id='LC207'>&nbsp;&nbsp;&nbsp;&nbsp;resizeStart?: DialogEvent;</div><div class='line' id='LC208'>&nbsp;&nbsp;&nbsp;&nbsp;resizeStop?: DialogEvent;</div><div class='line' id='LC209'>}</div><div class='line' id='LC210'><br/></div><div class='line' id='LC211'>interface Dialog extends Widget, DialogOptions, DialogEvents {</div><div class='line' id='LC212'>}</div><div class='line' id='LC213'><br/></div><div class='line' id='LC214'><br/></div><div class='line' id='LC215'>// Draggable //////////////////////////////////////////////////</div><div class='line' id='LC216'><br/></div><div class='line' id='LC217'>interface DraggableEventUIParams {</div><div class='line' id='LC218'>&nbsp;&nbsp;&nbsp;&nbsp;helper: JQuery;</div><div class='line' id='LC219'>&nbsp;&nbsp;&nbsp;&nbsp;position: { top: number; left: number; };</div><div class='line' id='LC220'>&nbsp;&nbsp;&nbsp;&nbsp;offset: { top: number; left: number; };</div><div class='line' id='LC221'>}</div><div class='line' id='LC222'><br/></div><div class='line' id='LC223'>interface DraggableEvent {</div><div class='line' id='LC224'>&nbsp;&nbsp;&nbsp;&nbsp;(event: Event, ui: DraggableEventUIParams): void;</div><div class='line' id='LC225'>}</div><div class='line' id='LC226'><br/></div><div class='line' id='LC227'>interface DraggableOptions {</div><div class='line' id='LC228'>&nbsp;&nbsp;&nbsp;&nbsp;disabled?: bool;</div><div class='line' id='LC229'>&nbsp;&nbsp;&nbsp;&nbsp;addClasses?: bool;</div><div class='line' id='LC230'>&nbsp;&nbsp;&nbsp;&nbsp;appendTo?: any;</div><div class='line' id='LC231'>&nbsp;&nbsp;&nbsp;&nbsp;axis?: string;</div><div class='line' id='LC232'>&nbsp;&nbsp;&nbsp;&nbsp;cancel?: string;</div><div class='line' id='LC233'>&nbsp;&nbsp;&nbsp;&nbsp;connectToSortable?: string;</div><div class='line' id='LC234'>&nbsp;&nbsp;&nbsp;&nbsp;containment?: any;</div><div class='line' id='LC235'>&nbsp;&nbsp;&nbsp;&nbsp;cursor?: string;</div><div class='line' id='LC236'>&nbsp;&nbsp;&nbsp;&nbsp;cursorAt?: any;</div><div class='line' id='LC237'>&nbsp;&nbsp;&nbsp;&nbsp;delay?: number;</div><div class='line' id='LC238'>&nbsp;&nbsp;&nbsp;&nbsp;distance?: number;</div><div class='line' id='LC239'>&nbsp;&nbsp;&nbsp;&nbsp;grid?: number[];</div><div class='line' id='LC240'>&nbsp;&nbsp;&nbsp;&nbsp;handle?: any;</div><div class='line' id='LC241'>&nbsp;&nbsp;&nbsp;&nbsp;helper?: any;</div><div class='line' id='LC242'>&nbsp;&nbsp;&nbsp;&nbsp;iframeFix?: any;</div><div class='line' id='LC243'>&nbsp;&nbsp;&nbsp;&nbsp;opacity?: number;</div><div class='line' id='LC244'>&nbsp;&nbsp;&nbsp;&nbsp;refreshPositions?: bool;</div><div class='line' id='LC245'>&nbsp;&nbsp;&nbsp;&nbsp;revert?: any;</div><div class='line' id='LC246'>&nbsp;&nbsp;&nbsp;&nbsp;revertDuration?: number;</div><div class='line' id='LC247'>&nbsp;&nbsp;&nbsp;&nbsp;scope?: string;</div><div class='line' id='LC248'>&nbsp;&nbsp;&nbsp;&nbsp;scroll?: bool;</div><div class='line' id='LC249'>&nbsp;&nbsp;&nbsp;&nbsp;scrollSensitivity?: number;</div><div class='line' id='LC250'>&nbsp;&nbsp;&nbsp;&nbsp;scrollSpeed?: number;</div><div class='line' id='LC251'>&nbsp;&nbsp;&nbsp;&nbsp;snap?: any;</div><div class='line' id='LC252'>&nbsp;&nbsp;&nbsp;&nbsp;snapMode?: string;</div><div class='line' id='LC253'>&nbsp;&nbsp;&nbsp;&nbsp;snapTolerance?: number;</div><div class='line' id='LC254'>&nbsp;&nbsp;&nbsp;&nbsp;stack?: string;</div><div class='line' id='LC255'>&nbsp;&nbsp;&nbsp;&nbsp;zIndex?: number;</div><div class='line' id='LC256'>}</div><div class='line' id='LC257'><br/></div><div class='line' id='LC258'>interface DraggableEvents {</div><div class='line' id='LC259'>&nbsp;&nbsp;&nbsp;&nbsp;create?: DraggableEvent;</div><div class='line' id='LC260'>&nbsp;&nbsp;&nbsp;&nbsp;start?: DraggableEvent;</div><div class='line' id='LC261'>&nbsp;&nbsp;&nbsp;&nbsp;drag?: DraggableEvent;</div><div class='line' id='LC262'>&nbsp;&nbsp;&nbsp;&nbsp;stop?: DraggableEvent;</div><div class='line' id='LC263'>}</div><div class='line' id='LC264'><br/></div><div class='line' id='LC265'>interface Draggable extends Widget, DraggableOptions, DraggableEvent {</div><div class='line' id='LC266'>}</div><div class='line' id='LC267'><br/></div><div class='line' id='LC268'><br/></div><div class='line' id='LC269'>// Droppable //////////////////////////////////////////////////</div><div class='line' id='LC270'><br/></div><div class='line' id='LC271'>interface DroppableEventUIParam {</div><div class='line' id='LC272'>&nbsp;&nbsp;&nbsp;&nbsp;draggable: JQuery;</div><div class='line' id='LC273'>&nbsp;&nbsp;&nbsp;&nbsp;helper: JQuery;</div><div class='line' id='LC274'>&nbsp;&nbsp;&nbsp;&nbsp;position: { top: number; left: number; };</div><div class='line' id='LC275'>&nbsp;&nbsp;&nbsp;&nbsp;offset: { top: number; left: number; };</div><div class='line' id='LC276'>}</div><div class='line' id='LC277'><br/></div><div class='line' id='LC278'>interface DroppableEvent {</div><div class='line' id='LC279'>&nbsp;&nbsp;&nbsp;&nbsp;(event: Event, ui: DroppableEventUIParam): void;</div><div class='line' id='LC280'>}</div><div class='line' id='LC281'><br/></div><div class='line' id='LC282'>interface DroppableOptions {</div><div class='line' id='LC283'>&nbsp;&nbsp;&nbsp;&nbsp;disabled?: bool;</div><div class='line' id='LC284'>&nbsp;&nbsp;&nbsp;&nbsp;accept?: any;</div><div class='line' id='LC285'>&nbsp;&nbsp;&nbsp;&nbsp;activeClass?: string;</div><div class='line' id='LC286'>&nbsp;&nbsp;&nbsp;&nbsp;greedy?: bool;</div><div class='line' id='LC287'>&nbsp;&nbsp;&nbsp;&nbsp;hoverClass?: string;</div><div class='line' id='LC288'>&nbsp;&nbsp;&nbsp;&nbsp;scope?: string;</div><div class='line' id='LC289'>&nbsp;&nbsp;&nbsp;&nbsp;tolerance?: string;</div><div class='line' id='LC290'>}</div><div class='line' id='LC291'><br/></div><div class='line' id='LC292'>interface DroppableEvents {</div><div class='line' id='LC293'>&nbsp;&nbsp;&nbsp;&nbsp;create?: DroppableEvent;</div><div class='line' id='LC294'>&nbsp;&nbsp;&nbsp;&nbsp;activate?: DroppableEvent;</div><div class='line' id='LC295'>&nbsp;&nbsp;&nbsp;&nbsp;deactivate?: DroppableEvent;</div><div class='line' id='LC296'>&nbsp;&nbsp;&nbsp;&nbsp;over?: DroppableEvent;</div><div class='line' id='LC297'>&nbsp;&nbsp;&nbsp;&nbsp;out?: DroppableEvent;</div><div class='line' id='LC298'>&nbsp;&nbsp;&nbsp;&nbsp;drop?: DroppableEvent;</div><div class='line' id='LC299'>}</div><div class='line' id='LC300'><br/></div><div class='line' id='LC301'>interface Droppable extends Widget, DroppableOptions, DroppableEvents {</div><div class='line' id='LC302'>}</div><div class='line' id='LC303'><br/></div><div class='line' id='LC304'>// Menu //////////////////////////////////////////////////</div><div class='line' id='LC305'><br/></div><div class='line' id='LC306'>interface MenuOptions {</div><div class='line' id='LC307'>&nbsp;&nbsp;&nbsp;&nbsp;disabled?: bool;</div><div class='line' id='LC308'>&nbsp;&nbsp;&nbsp;&nbsp;icons?: any;</div><div class='line' id='LC309'>&nbsp;&nbsp;&nbsp;&nbsp;menus?: string;</div><div class='line' id='LC310'>&nbsp;&nbsp;&nbsp;&nbsp;position?: any; // TODO</div><div class='line' id='LC311'>&nbsp;&nbsp;&nbsp;&nbsp;role?: string;</div><div class='line' id='LC312'>}</div><div class='line' id='LC313'><br/></div><div class='line' id='LC314'>interface MenuUIParams {</div><div class='line' id='LC315'>}</div><div class='line' id='LC316'><br/></div><div class='line' id='LC317'>interface MenuEvent {</div><div class='line' id='LC318'>&nbsp;&nbsp;&nbsp;&nbsp;(event: Event, ui: MenuUIParams): void;</div><div class='line' id='LC319'>}</div><div class='line' id='LC320'><br/></div><div class='line' id='LC321'>interface MenuEvents {</div><div class='line' id='LC322'>&nbsp;&nbsp;&nbsp;&nbsp;blur?: MenuEvent;</div><div class='line' id='LC323'>&nbsp;&nbsp;&nbsp;&nbsp;create?: MenuEvent;</div><div class='line' id='LC324'>&nbsp;&nbsp;&nbsp;&nbsp;focus?: MenuEvent;</div><div class='line' id='LC325'>&nbsp;&nbsp;&nbsp;&nbsp;select?: MenuEvent;</div><div class='line' id='LC326'>}</div><div class='line' id='LC327'><br/></div><div class='line' id='LC328'>interface Menu extends Widget, MenuOptions, MenuEvents {</div><div class='line' id='LC329'>}</div><div class='line' id='LC330'><br/></div><div class='line' id='LC331'><br/></div><div class='line' id='LC332'>// Progressbar //////////////////////////////////////////////////</div><div class='line' id='LC333'><br/></div><div class='line' id='LC334'>interface ProgressbarOptions {</div><div class='line' id='LC335'>&nbsp;&nbsp;&nbsp;&nbsp;disabled?: bool;</div><div class='line' id='LC336'>&nbsp;&nbsp;&nbsp;&nbsp;value?: number;</div><div class='line' id='LC337'>}</div><div class='line' id='LC338'><br/></div><div class='line' id='LC339'>interface ProgressbarUIParams {</div><div class='line' id='LC340'>}</div><div class='line' id='LC341'><br/></div><div class='line' id='LC342'>interface ProgressbarEvent {</div><div class='line' id='LC343'>&nbsp;&nbsp;&nbsp;&nbsp;(event: Event, ui: ProgressbarUIParams): void;</div><div class='line' id='LC344'>}</div><div class='line' id='LC345'><br/></div><div class='line' id='LC346'>interface ProgressbarEvents {</div><div class='line' id='LC347'>&nbsp;&nbsp;&nbsp;&nbsp;change?: ProgressbarEvent;</div><div class='line' id='LC348'>&nbsp;&nbsp;&nbsp;&nbsp;complete?: ProgressbarEvent;</div><div class='line' id='LC349'>&nbsp;&nbsp;&nbsp;&nbsp;create?: ProgressbarEvent;</div><div class='line' id='LC350'>}</div><div class='line' id='LC351'><br/></div><div class='line' id='LC352'>interface Progressbar extends Widget, ProgressbarOptions, ProgressbarEvents {</div><div class='line' id='LC353'>}</div><div class='line' id='LC354'><br/></div><div class='line' id='LC355'><br/></div><div class='line' id='LC356'>// Resizable //////////////////////////////////////////////////</div><div class='line' id='LC357'><br/></div><div class='line' id='LC358'>interface ResizableOptions {</div><div class='line' id='LC359'>&nbsp;&nbsp;&nbsp;&nbsp;alsoResize?: any; // Selector, JQuery or Element</div><div class='line' id='LC360'>&nbsp;&nbsp;&nbsp;&nbsp;animate?: bool;</div><div class='line' id='LC361'>&nbsp;&nbsp;&nbsp;&nbsp;animateDuration?: any; // number or string</div><div class='line' id='LC362'>&nbsp;&nbsp;&nbsp;&nbsp;animateEasing?: string;</div><div class='line' id='LC363'>&nbsp;&nbsp;&nbsp;&nbsp;aspectRatio?: any; // bool or number</div><div class='line' id='LC364'>&nbsp;&nbsp;&nbsp;&nbsp;autoHide?: bool;</div><div class='line' id='LC365'>&nbsp;&nbsp;&nbsp;&nbsp;cancel?: string;</div><div class='line' id='LC366'>&nbsp;&nbsp;&nbsp;&nbsp;containment?: any; // Selector, Element or string</div><div class='line' id='LC367'>&nbsp;&nbsp;&nbsp;&nbsp;delay?: number;</div><div class='line' id='LC368'>&nbsp;&nbsp;&nbsp;&nbsp;disabled?: bool;</div><div class='line' id='LC369'>&nbsp;&nbsp;&nbsp;&nbsp;distance?: number;</div><div class='line' id='LC370'>&nbsp;&nbsp;&nbsp;&nbsp;ghost?: bool;</div><div class='line' id='LC371'>&nbsp;&nbsp;&nbsp;&nbsp;grid?: any;</div><div class='line' id='LC372'>&nbsp;&nbsp;&nbsp;&nbsp;handles?: any; // string or object</div><div class='line' id='LC373'>&nbsp;&nbsp;&nbsp;&nbsp;helper?: string;</div><div class='line' id='LC374'>&nbsp;&nbsp;&nbsp;&nbsp;maxHeight?: number;</div><div class='line' id='LC375'>&nbsp;&nbsp;&nbsp;&nbsp;maxWidth?: number;</div><div class='line' id='LC376'>&nbsp;&nbsp;&nbsp;&nbsp;minHeight?: number;</div><div class='line' id='LC377'>&nbsp;&nbsp;&nbsp;&nbsp;minWidth?: number;</div><div class='line' id='LC378'>}</div><div class='line' id='LC379'><br/></div><div class='line' id='LC380'>interface ResizableUIParams {</div><div class='line' id='LC381'>&nbsp;&nbsp;&nbsp;&nbsp;element: JQuery;</div><div class='line' id='LC382'>&nbsp;&nbsp;&nbsp;&nbsp;helper: JQuery;</div><div class='line' id='LC383'>&nbsp;&nbsp;&nbsp;&nbsp;originalElement: JQuery;</div><div class='line' id='LC384'>&nbsp;&nbsp;&nbsp;&nbsp;originalPosition: any;</div><div class='line' id='LC385'>&nbsp;&nbsp;&nbsp;&nbsp;originalSize: any;</div><div class='line' id='LC386'>&nbsp;&nbsp;&nbsp;&nbsp;position: any;</div><div class='line' id='LC387'>&nbsp;&nbsp;&nbsp;&nbsp;size: any;</div><div class='line' id='LC388'>}</div><div class='line' id='LC389'><br/></div><div class='line' id='LC390'>interface ResizableEvent {</div><div class='line' id='LC391'>&nbsp;&nbsp;&nbsp;&nbsp;(event: Event, ui: ResizableUIParams): void;</div><div class='line' id='LC392'>}</div><div class='line' id='LC393'><br/></div><div class='line' id='LC394'>interface ResizableEvents {</div><div class='line' id='LC395'>&nbsp;&nbsp;&nbsp;&nbsp;resize?: ResizableEvent;</div><div class='line' id='LC396'>&nbsp;&nbsp;&nbsp;&nbsp;start?: ResizableEvent;</div><div class='line' id='LC397'>&nbsp;&nbsp;&nbsp;&nbsp;stop?: ResizableEvent;</div><div class='line' id='LC398'>}</div><div class='line' id='LC399'><br/></div><div class='line' id='LC400'>interface Resizable extends Widget, ResizableOptions, ResizableEvents {</div><div class='line' id='LC401'>}</div><div class='line' id='LC402'><br/></div><div class='line' id='LC403'><br/></div><div class='line' id='LC404'>// Selectable //////////////////////////////////////////////////</div><div class='line' id='LC405'><br/></div><div class='line' id='LC406'>interface SelectableOptions {</div><div class='line' id='LC407'>&nbsp;&nbsp;&nbsp;&nbsp;autoRefresh?: bool;</div><div class='line' id='LC408'>&nbsp;&nbsp;&nbsp;&nbsp;cancel?: string;</div><div class='line' id='LC409'>&nbsp;&nbsp;&nbsp;&nbsp;delay?: number;</div><div class='line' id='LC410'>&nbsp;&nbsp;&nbsp;&nbsp;disabled?: bool;</div><div class='line' id='LC411'>&nbsp;&nbsp;&nbsp;&nbsp;distance?: number;</div><div class='line' id='LC412'>&nbsp;&nbsp;&nbsp;&nbsp;filter?: string;</div><div class='line' id='LC413'>&nbsp;&nbsp;&nbsp;&nbsp;tolerance?: string;</div><div class='line' id='LC414'>}</div><div class='line' id='LC415'><br/></div><div class='line' id='LC416'>interface SelectableEvents {</div><div class='line' id='LC417'>&nbsp;&nbsp;&nbsp;&nbsp;selected? (event: Event, ui: { selected?: Element; }): void;</div><div class='line' id='LC418'>&nbsp;&nbsp;&nbsp;&nbsp;selecting? (event: Event, ui: { selecting?: Element; }): void;</div><div class='line' id='LC419'>&nbsp;&nbsp;&nbsp;&nbsp;start? (event: Event, ui: any): void;</div><div class='line' id='LC420'>&nbsp;&nbsp;&nbsp;&nbsp;stop? (event: Event, ui: any): void;</div><div class='line' id='LC421'>&nbsp;&nbsp;&nbsp;&nbsp;unselected? (event: Event, ui: { unselected: Element; }): void;</div><div class='line' id='LC422'>&nbsp;&nbsp;&nbsp;&nbsp;unselecting? (event: Event, ui: { unselecting: Element; }): void;</div><div class='line' id='LC423'>}</div><div class='line' id='LC424'><br/></div><div class='line' id='LC425'>interface Selectable extends Widget, SelectableOptions, SelectableEvents {</div><div class='line' id='LC426'>}</div><div class='line' id='LC427'><br/></div><div class='line' id='LC428'>// Slider //////////////////////////////////////////////////</div><div class='line' id='LC429'><br/></div><div class='line' id='LC430'>interface SliderOptions {</div><div class='line' id='LC431'>&nbsp;&nbsp;&nbsp;&nbsp;animate?: any; // bool, string or number</div><div class='line' id='LC432'>&nbsp;&nbsp;&nbsp;&nbsp;disabled?: bool;</div><div class='line' id='LC433'>&nbsp;&nbsp;&nbsp;&nbsp;max?: number;</div><div class='line' id='LC434'>&nbsp;&nbsp;&nbsp;&nbsp;min?: number;</div><div class='line' id='LC435'>&nbsp;&nbsp;&nbsp;&nbsp;orientation?: string;</div><div class='line' id='LC436'>&nbsp;&nbsp;&nbsp;&nbsp;range?: any; // bool or string</div><div class='line' id='LC437'>&nbsp;&nbsp;&nbsp;&nbsp;step?: number;</div><div class='line' id='LC438'>&nbsp;&nbsp;&nbsp;&nbsp;// value?: number;</div><div class='line' id='LC439'>&nbsp;&nbsp;&nbsp;&nbsp;// values?: number[];</div><div class='line' id='LC440'>}</div><div class='line' id='LC441'><br/></div><div class='line' id='LC442'>interface SliderUIParams {</div><div class='line' id='LC443'>}</div><div class='line' id='LC444'><br/></div><div class='line' id='LC445'>interface SliderEvent {</div><div class='line' id='LC446'>&nbsp;&nbsp;&nbsp;&nbsp;(event: Event, ui: SliderUIParams): void;</div><div class='line' id='LC447'>}</div><div class='line' id='LC448'><br/></div><div class='line' id='LC449'>interface SliderEvents {</div><div class='line' id='LC450'>&nbsp;&nbsp;&nbsp;&nbsp;change?: SliderEvent;</div><div class='line' id='LC451'>&nbsp;&nbsp;&nbsp;&nbsp;create?: SliderEvent;</div><div class='line' id='LC452'>&nbsp;&nbsp;&nbsp;&nbsp;slide?: SliderEvent;</div><div class='line' id='LC453'>&nbsp;&nbsp;&nbsp;&nbsp;start?: SliderEvent;</div><div class='line' id='LC454'>&nbsp;&nbsp;&nbsp;&nbsp;stop?: SliderEvent;</div><div class='line' id='LC455'>}</div><div class='line' id='LC456'><br/></div><div class='line' id='LC457'>interface Slider extends Widget, SliderOptions, SliderEvents {</div><div class='line' id='LC458'>}</div><div class='line' id='LC459'><br/></div><div class='line' id='LC460'><br/></div><div class='line' id='LC461'>// Sortable //////////////////////////////////////////////////</div><div class='line' id='LC462'><br/></div><div class='line' id='LC463'>interface SortableOptions {</div><div class='line' id='LC464'>&nbsp;&nbsp;&nbsp;&nbsp;appendTo?: any; // jQuery, Element, Selector or string</div><div class='line' id='LC465'>&nbsp;&nbsp;&nbsp;&nbsp;axis?: string;</div><div class='line' id='LC466'>&nbsp;&nbsp;&nbsp;&nbsp;cancel?: string;</div><div class='line' id='LC467'>&nbsp;&nbsp;&nbsp;&nbsp;connectWith?: string;</div><div class='line' id='LC468'>&nbsp;&nbsp;&nbsp;&nbsp;containment?: any; // Element, Selector or string</div><div class='line' id='LC469'>&nbsp;&nbsp;&nbsp;&nbsp;cursor?: string;</div><div class='line' id='LC470'>&nbsp;&nbsp;&nbsp;&nbsp;cursorAt?: any;</div><div class='line' id='LC471'>&nbsp;&nbsp;&nbsp;&nbsp;delay?: number;</div><div class='line' id='LC472'>&nbsp;&nbsp;&nbsp;&nbsp;disabled?: bool;</div><div class='line' id='LC473'>&nbsp;&nbsp;&nbsp;&nbsp;distance?: number;</div><div class='line' id='LC474'>&nbsp;&nbsp;&nbsp;&nbsp;dropOnEmpty?: bool;</div><div class='line' id='LC475'>&nbsp;&nbsp;&nbsp;&nbsp;forceHelperSize?: bool;</div><div class='line' id='LC476'>&nbsp;&nbsp;&nbsp;&nbsp;forcePlaceholderSize?: bool;</div><div class='line' id='LC477'>&nbsp;&nbsp;&nbsp;&nbsp;grid?: number[];</div><div class='line' id='LC478'>&nbsp;&nbsp;&nbsp;&nbsp;handle?: any; // Selector or Element</div><div class='line' id='LC479'>&nbsp;&nbsp;&nbsp;&nbsp;items?: any; // Selector</div><div class='line' id='LC480'>&nbsp;&nbsp;&nbsp;&nbsp;opacity?: number;</div><div class='line' id='LC481'>&nbsp;&nbsp;&nbsp;&nbsp;placeholder?: string;</div><div class='line' id='LC482'>&nbsp;&nbsp;&nbsp;&nbsp;revert?: any; // bool or number</div><div class='line' id='LC483'>&nbsp;&nbsp;&nbsp;&nbsp;scroll?: bool;</div><div class='line' id='LC484'>&nbsp;&nbsp;&nbsp;&nbsp;scrollSensitivity?: number;</div><div class='line' id='LC485'>&nbsp;&nbsp;&nbsp;&nbsp;scrollSpeed?: number;</div><div class='line' id='LC486'>&nbsp;&nbsp;&nbsp;&nbsp;tolerance?: string;</div><div class='line' id='LC487'>&nbsp;&nbsp;&nbsp;&nbsp;zIndex?: number;</div><div class='line' id='LC488'>}</div><div class='line' id='LC489'><br/></div><div class='line' id='LC490'>interface SortableUIParams {</div><div class='line' id='LC491'>&nbsp;&nbsp;&nbsp;&nbsp;helper: JQuery;</div><div class='line' id='LC492'>&nbsp;&nbsp;&nbsp;&nbsp;item: JQuery;</div><div class='line' id='LC493'>&nbsp;&nbsp;&nbsp;&nbsp;offset: any;</div><div class='line' id='LC494'>&nbsp;&nbsp;&nbsp;&nbsp;position: any;</div><div class='line' id='LC495'>&nbsp;&nbsp;&nbsp;&nbsp;originalPosition: any;</div><div class='line' id='LC496'>&nbsp;&nbsp;&nbsp;&nbsp;sender: JQuery;</div><div class='line' id='LC497'>}</div><div class='line' id='LC498'><br/></div><div class='line' id='LC499'>interface SortableEvent {</div><div class='line' id='LC500'>&nbsp;&nbsp;&nbsp;&nbsp;(event: Event, ui: SortableUIParams): void;</div><div class='line' id='LC501'>}</div><div class='line' id='LC502'><br/></div><div class='line' id='LC503'>interface SortableEvents {</div><div class='line' id='LC504'>&nbsp;&nbsp;&nbsp;&nbsp;activate?: SortableEvent;</div><div class='line' id='LC505'>&nbsp;&nbsp;&nbsp;&nbsp;beforeStop?: SortableEvent;</div><div class='line' id='LC506'>&nbsp;&nbsp;&nbsp;&nbsp;change?: SortableEvent;</div><div class='line' id='LC507'>&nbsp;&nbsp;&nbsp;&nbsp;deactivate?: SortableEvent;</div><div class='line' id='LC508'>&nbsp;&nbsp;&nbsp;&nbsp;out?: SortableEvent;</div><div class='line' id='LC509'>&nbsp;&nbsp;&nbsp;&nbsp;over?: SortableEvent;</div><div class='line' id='LC510'>&nbsp;&nbsp;&nbsp;&nbsp;receive?: SortableEvent;</div><div class='line' id='LC511'>&nbsp;&nbsp;&nbsp;&nbsp;remove?: SortableEvent;</div><div class='line' id='LC512'>&nbsp;&nbsp;&nbsp;&nbsp;sort?: SortableEvent;</div><div class='line' id='LC513'>&nbsp;&nbsp;&nbsp;&nbsp;start?: SortableEvent;</div><div class='line' id='LC514'>&nbsp;&nbsp;&nbsp;&nbsp;stop?: SortableEvent;</div><div class='line' id='LC515'>&nbsp;&nbsp;&nbsp;&nbsp;update?: SortableEvent;</div><div class='line' id='LC516'>}</div><div class='line' id='LC517'><br/></div><div class='line' id='LC518'>interface Sortable extends Widget, SortableOptions, SortableEvents {</div><div class='line' id='LC519'>}</div><div class='line' id='LC520'><br/></div><div class='line' id='LC521'><br/></div><div class='line' id='LC522'>// Spinner //////////////////////////////////////////////////</div><div class='line' id='LC523'><br/></div><div class='line' id='LC524'>interface SpinnerOptions {</div><div class='line' id='LC525'>&nbsp;&nbsp;&nbsp;&nbsp;culture?: string;</div><div class='line' id='LC526'>&nbsp;&nbsp;&nbsp;&nbsp;disabled?: bool;</div><div class='line' id='LC527'>&nbsp;&nbsp;&nbsp;&nbsp;icons?: any;</div><div class='line' id='LC528'>&nbsp;&nbsp;&nbsp;&nbsp;incremental?: any; // bool or ()</div><div class='line' id='LC529'>&nbsp;&nbsp;&nbsp;&nbsp;max?: any; // number or string</div><div class='line' id='LC530'>&nbsp;&nbsp;&nbsp;&nbsp;min?: any; // number or string</div><div class='line' id='LC531'>&nbsp;&nbsp;&nbsp;&nbsp;numberFormat?: string;</div><div class='line' id='LC532'>&nbsp;&nbsp;&nbsp;&nbsp;page?: number;</div><div class='line' id='LC533'>&nbsp;&nbsp;&nbsp;&nbsp;step?: any; // number or string</div><div class='line' id='LC534'>}</div><div class='line' id='LC535'><br/></div><div class='line' id='LC536'>interface SpinnerUIParams {</div><div class='line' id='LC537'>}</div><div class='line' id='LC538'><br/></div><div class='line' id='LC539'>interface SpinnerEvent {</div><div class='line' id='LC540'>&nbsp;&nbsp;&nbsp;&nbsp;(event: Event, ui: SpinnerUIParams): void;</div><div class='line' id='LC541'>}</div><div class='line' id='LC542'><br/></div><div class='line' id='LC543'>interface SpinnerEvents {</div><div class='line' id='LC544'>&nbsp;&nbsp;&nbsp;&nbsp;spin?: SpinnerEvent;</div><div class='line' id='LC545'>&nbsp;&nbsp;&nbsp;&nbsp;start?: SpinnerEvent;</div><div class='line' id='LC546'>&nbsp;&nbsp;&nbsp;&nbsp;stop?: SpinnerEvent;</div><div class='line' id='LC547'>}</div><div class='line' id='LC548'><br/></div><div class='line' id='LC549'>interface Spinner extends Widget, SpinnerOptions, SpinnerEvents {</div><div class='line' id='LC550'>}</div><div class='line' id='LC551'><br/></div><div class='line' id='LC552'><br/></div><div class='line' id='LC553'>// Tabs //////////////////////////////////////////////////</div><div class='line' id='LC554'><br/></div><div class='line' id='LC555'>interface TabsOptions {</div><div class='line' id='LC556'>&nbsp;&nbsp;&nbsp;&nbsp;active?: any; // bool or number</div><div class='line' id='LC557'>&nbsp;&nbsp;&nbsp;&nbsp;collapsible?: bool;</div><div class='line' id='LC558'>&nbsp;&nbsp;&nbsp;&nbsp;disabled?: any; // bool or []</div><div class='line' id='LC559'>&nbsp;&nbsp;&nbsp;&nbsp;event?: string;</div><div class='line' id='LC560'>&nbsp;&nbsp;&nbsp;&nbsp;heightStyle?: string;</div><div class='line' id='LC561'>&nbsp;&nbsp;&nbsp;&nbsp;hide?: any; // bool, number, string or object</div><div class='line' id='LC562'>&nbsp;&nbsp;&nbsp;&nbsp;show?: any; // bool, number, string or object</div><div class='line' id='LC563'>}</div><div class='line' id='LC564'><br/></div><div class='line' id='LC565'>interface TabsUIParams {</div><div class='line' id='LC566'>}</div><div class='line' id='LC567'><br/></div><div class='line' id='LC568'>interface TabsEvent {</div><div class='line' id='LC569'>&nbsp;&nbsp;&nbsp;&nbsp;(event: Event, ui: TabsUIParams): void;</div><div class='line' id='LC570'>}</div><div class='line' id='LC571'><br/></div><div class='line' id='LC572'>interface TabsEvents {</div><div class='line' id='LC573'>&nbsp;&nbsp;&nbsp;&nbsp;activate?: TabsEvent;</div><div class='line' id='LC574'>&nbsp;&nbsp;&nbsp;&nbsp;beforeActivate?: TabsEvent;</div><div class='line' id='LC575'>&nbsp;&nbsp;&nbsp;&nbsp;beforeLoad?: TabsEvent;</div><div class='line' id='LC576'>&nbsp;&nbsp;&nbsp;&nbsp;load?: TabsEvent;</div><div class='line' id='LC577'>}</div><div class='line' id='LC578'><br/></div><div class='line' id='LC579'>interface Tabs extends Widget, TabsOptions, TabsEvents {</div><div class='line' id='LC580'>}</div><div class='line' id='LC581'><br/></div><div class='line' id='LC582'><br/></div><div class='line' id='LC583'>// Tooltip //////////////////////////////////////////////////</div><div class='line' id='LC584'><br/></div><div class='line' id='LC585'>interface TooltipOptions {</div><div class='line' id='LC586'>&nbsp;&nbsp;&nbsp;&nbsp;content?: any; // () or string</div><div class='line' id='LC587'>&nbsp;&nbsp;&nbsp;&nbsp;disabled?: bool;</div><div class='line' id='LC588'>&nbsp;&nbsp;&nbsp;&nbsp;hide?: any; // bool, number, string or object</div><div class='line' id='LC589'>&nbsp;&nbsp;&nbsp;&nbsp;items?: string;</div><div class='line' id='LC590'>&nbsp;&nbsp;&nbsp;&nbsp;position?: any; // TODO</div><div class='line' id='LC591'>&nbsp;&nbsp;&nbsp;&nbsp;show?: any; // bool, number, string or object</div><div class='line' id='LC592'>&nbsp;&nbsp;&nbsp;&nbsp;tooltipClass?: string;</div><div class='line' id='LC593'>&nbsp;&nbsp;&nbsp;&nbsp;track?: bool;</div><div class='line' id='LC594'>}</div><div class='line' id='LC595'><br/></div><div class='line' id='LC596'>interface TooltipUIParams {</div><div class='line' id='LC597'>}</div><div class='line' id='LC598'><br/></div><div class='line' id='LC599'>interface TooltipEvent {</div><div class='line' id='LC600'>&nbsp;&nbsp;&nbsp;&nbsp;(event: Event, ui: TooltipUIParams): void;</div><div class='line' id='LC601'>}</div><div class='line' id='LC602'><br/></div><div class='line' id='LC603'>interface TooltipEvents {</div><div class='line' id='LC604'>&nbsp;&nbsp;&nbsp;&nbsp;close?: TooltipEvent;</div><div class='line' id='LC605'>&nbsp;&nbsp;&nbsp;&nbsp;open?: TooltipEvent;</div><div class='line' id='LC606'>}</div><div class='line' id='LC607'><br/></div><div class='line' id='LC608'>interface Tooltip extends Widget, TooltipOptions, TooltipEvents {</div><div class='line' id='LC609'>}</div><div class='line' id='LC610'><br/></div><div class='line' id='LC611'><br/></div><div class='line' id='LC612'>// Effects //////////////////////////////////////////////////</div><div class='line' id='LC613'><br/></div><div class='line' id='LC614'>interface EffectOptions {</div><div class='line' id='LC615'>&nbsp;&nbsp;&nbsp;&nbsp;effect: string;</div><div class='line' id='LC616'>&nbsp;&nbsp;&nbsp;&nbsp;easing?: string;</div><div class='line' id='LC617'>&nbsp;&nbsp;&nbsp;&nbsp;duration: any;</div><div class='line' id='LC618'>&nbsp;&nbsp;&nbsp;&nbsp;complete: Function;</div><div class='line' id='LC619'>}</div><div class='line' id='LC620'><br/></div><div class='line' id='LC621'>interface BlindEffect {</div><div class='line' id='LC622'>&nbsp;&nbsp;&nbsp;&nbsp;direction?: string;</div><div class='line' id='LC623'>}</div><div class='line' id='LC624'><br/></div><div class='line' id='LC625'>interface BounceEffect {</div><div class='line' id='LC626'>&nbsp;&nbsp;&nbsp;&nbsp;distance?: number;</div><div class='line' id='LC627'>&nbsp;&nbsp;&nbsp;&nbsp;times?: number;</div><div class='line' id='LC628'>}</div><div class='line' id='LC629'><br/></div><div class='line' id='LC630'>interface ClipEffect {</div><div class='line' id='LC631'>&nbsp;&nbsp;&nbsp;&nbsp;direction?: number;</div><div class='line' id='LC632'>}</div><div class='line' id='LC633'><br/></div><div class='line' id='LC634'>interface DropEffect {</div><div class='line' id='LC635'>&nbsp;&nbsp;&nbsp;&nbsp;direction?: number;</div><div class='line' id='LC636'>}</div><div class='line' id='LC637'><br/></div><div class='line' id='LC638'>interface ExplodeEffect {</div><div class='line' id='LC639'>&nbsp;&nbsp;&nbsp;&nbsp;pieces?: number;</div><div class='line' id='LC640'>}</div><div class='line' id='LC641'><br/></div><div class='line' id='LC642'>interface FadeEffect { }</div><div class='line' id='LC643'><br/></div><div class='line' id='LC644'>interface FoldEffect {</div><div class='line' id='LC645'>&nbsp;&nbsp;&nbsp;&nbsp;size?: any;</div><div class='line' id='LC646'>&nbsp;&nbsp;&nbsp;&nbsp;horizFirst?: bool;</div><div class='line' id='LC647'>}</div><div class='line' id='LC648'><br/></div><div class='line' id='LC649'>interface HighlightEffect {</div><div class='line' id='LC650'>&nbsp;&nbsp;&nbsp;&nbsp;color?: string;</div><div class='line' id='LC651'>}</div><div class='line' id='LC652'><br/></div><div class='line' id='LC653'>interface PuffEffect {</div><div class='line' id='LC654'>&nbsp;&nbsp;&nbsp;&nbsp;percent?: number;</div><div class='line' id='LC655'>}</div><div class='line' id='LC656'><br/></div><div class='line' id='LC657'>interface PulsateEffect {</div><div class='line' id='LC658'>&nbsp;&nbsp;&nbsp;&nbsp;times?: number;</div><div class='line' id='LC659'>}</div><div class='line' id='LC660'><br/></div><div class='line' id='LC661'>interface ScaleEffect {</div><div class='line' id='LC662'>&nbsp;&nbsp;&nbsp;&nbsp;direction?: string;</div><div class='line' id='LC663'>&nbsp;&nbsp;&nbsp;&nbsp;origin?: string[];</div><div class='line' id='LC664'>&nbsp;&nbsp;&nbsp;&nbsp;percent?: number;</div><div class='line' id='LC665'>&nbsp;&nbsp;&nbsp;&nbsp;scale?: string;</div><div class='line' id='LC666'>}</div><div class='line' id='LC667'><br/></div><div class='line' id='LC668'>interface ShakeEffect {</div><div class='line' id='LC669'>&nbsp;&nbsp;&nbsp;&nbsp;direction?: string;</div><div class='line' id='LC670'>&nbsp;&nbsp;&nbsp;&nbsp;distance?: number;</div><div class='line' id='LC671'>&nbsp;&nbsp;&nbsp;&nbsp;times?: number;</div><div class='line' id='LC672'>}</div><div class='line' id='LC673'><br/></div><div class='line' id='LC674'>interface SizeEffect {</div><div class='line' id='LC675'>&nbsp;&nbsp;&nbsp;&nbsp;to?: any;</div><div class='line' id='LC676'>&nbsp;&nbsp;&nbsp;&nbsp;origin?: string[];</div><div class='line' id='LC677'>&nbsp;&nbsp;&nbsp;&nbsp;scale?: string;</div><div class='line' id='LC678'>}</div><div class='line' id='LC679'><br/></div><div class='line' id='LC680'>interface SlideEffect {</div><div class='line' id='LC681'>&nbsp;&nbsp;&nbsp;&nbsp;direction?: string;</div><div class='line' id='LC682'>&nbsp;&nbsp;&nbsp;&nbsp;distance?: number;</div><div class='line' id='LC683'>}</div><div class='line' id='LC684'><br/></div><div class='line' id='LC685'>interface TransferEffect {</div><div class='line' id='LC686'>&nbsp;&nbsp;&nbsp;&nbsp;className?: string;</div><div class='line' id='LC687'>&nbsp;&nbsp;&nbsp;&nbsp;to?: string;</div><div class='line' id='LC688'>}</div><div class='line' id='LC689'><br/></div><div class='line' id='LC690'>interface JQueryPositionOptions {</div><div class='line' id='LC691'>&nbsp;&nbsp;&nbsp;&nbsp;my?: string;</div><div class='line' id='LC692'>&nbsp;&nbsp;&nbsp;&nbsp;at?: string;</div><div class='line' id='LC693'>&nbsp;&nbsp;&nbsp;&nbsp;of?: any;</div><div class='line' id='LC694'>&nbsp;&nbsp;&nbsp;&nbsp;collision?: string;</div><div class='line' id='LC695'>&nbsp;&nbsp;&nbsp;&nbsp;using?: Function;</div><div class='line' id='LC696'>&nbsp;&nbsp;&nbsp;&nbsp;within?: any;</div><div class='line' id='LC697'>}</div><div class='line' id='LC698'><br/></div><div class='line' id='LC699'><br/></div><div class='line' id='LC700'>// UI //////////////////////////////////////////////////</div><div class='line' id='LC701'><br/></div><div class='line' id='LC702'>interface MouseOptions {</div><div class='line' id='LC703'>&nbsp;&nbsp;&nbsp;&nbsp;cancel?: string;</div><div class='line' id='LC704'>&nbsp;&nbsp;&nbsp;&nbsp;delay?: number;</div><div class='line' id='LC705'>&nbsp;&nbsp;&nbsp;&nbsp;distance?: number;</div><div class='line' id='LC706'>}</div><div class='line' id='LC707'><br/></div><div class='line' id='LC708'>interface keyCode {</div><div class='line' id='LC709'>&nbsp;&nbsp;&nbsp;&nbsp;BACKSPACE: number;</div><div class='line' id='LC710'>&nbsp;&nbsp;&nbsp;&nbsp;COMMA: number;</div><div class='line' id='LC711'>&nbsp;&nbsp;&nbsp;&nbsp;DELETE: number;</div><div class='line' id='LC712'>&nbsp;&nbsp;&nbsp;&nbsp;DOWN: number;</div><div class='line' id='LC713'>&nbsp;&nbsp;&nbsp;&nbsp;END: number;</div><div class='line' id='LC714'>&nbsp;&nbsp;&nbsp;&nbsp;ENTER: number;</div><div class='line' id='LC715'>&nbsp;&nbsp;&nbsp;&nbsp;ESCAPE: number;</div><div class='line' id='LC716'>&nbsp;&nbsp;&nbsp;&nbsp;HOME: number;</div><div class='line' id='LC717'>&nbsp;&nbsp;&nbsp;&nbsp;LEFT: number;</div><div class='line' id='LC718'>&nbsp;&nbsp;&nbsp;&nbsp;NUMPAD_ADD: number;</div><div class='line' id='LC719'>&nbsp;&nbsp;&nbsp;&nbsp;NUMPAD_DECIMAL: number;</div><div class='line' id='LC720'>&nbsp;&nbsp;&nbsp;&nbsp;NUMPAD_DIVIDE: number;</div><div class='line' id='LC721'>&nbsp;&nbsp;&nbsp;&nbsp;NUMPAD_ENTER: number;</div><div class='line' id='LC722'>&nbsp;&nbsp;&nbsp;&nbsp;NUMPAD_MULTIPLY: number;</div><div class='line' id='LC723'>&nbsp;&nbsp;&nbsp;&nbsp;NUMPAD_SUBTRACT: number;</div><div class='line' id='LC724'>&nbsp;&nbsp;&nbsp;&nbsp;PAGE_DOWN: number;</div><div class='line' id='LC725'>&nbsp;&nbsp;&nbsp;&nbsp;PAGE_UP: number;</div><div class='line' id='LC726'>&nbsp;&nbsp;&nbsp;&nbsp;PERIOD: number;</div><div class='line' id='LC727'>&nbsp;&nbsp;&nbsp;&nbsp;RIGHT: number;</div><div class='line' id='LC728'>&nbsp;&nbsp;&nbsp;&nbsp;SPACE: number;</div><div class='line' id='LC729'>&nbsp;&nbsp;&nbsp;&nbsp;TAB: number;</div><div class='line' id='LC730'>&nbsp;&nbsp;&nbsp;&nbsp;UP: number;</div><div class='line' id='LC731'>}</div><div class='line' id='LC732'><br/></div><div class='line' id='LC733'>interface UI {</div><div class='line' id='LC734'>&nbsp;&nbsp;&nbsp;&nbsp;mouse(method: string): JQuery;</div><div class='line' id='LC735'>&nbsp;&nbsp;&nbsp;&nbsp;mouse(options: MouseOptions): JQuery;</div><div class='line' id='LC736'>&nbsp;&nbsp;&nbsp;&nbsp;mouse(optionLiteral: string, optionName: string, optionValue: any): JQuery;</div><div class='line' id='LC737'>&nbsp;&nbsp;&nbsp;&nbsp;mouse(optionLiteral: string, optionValue: any): any;</div><div class='line' id='LC738'><br/></div><div class='line' id='LC739'>&nbsp;&nbsp;&nbsp;&nbsp;accordion: Accordion;</div><div class='line' id='LC740'>&nbsp;&nbsp;&nbsp;&nbsp;autocomplete: Autocomplete;</div><div class='line' id='LC741'>&nbsp;&nbsp;&nbsp;&nbsp;button: Button;</div><div class='line' id='LC742'>&nbsp;&nbsp;&nbsp;&nbsp;buttonset: Button;</div><div class='line' id='LC743'>&nbsp;&nbsp;&nbsp;&nbsp;datepicker: Datepicker;</div><div class='line' id='LC744'>&nbsp;&nbsp;&nbsp;&nbsp;dialog: Dialog;</div><div class='line' id='LC745'>&nbsp;&nbsp;&nbsp;&nbsp;keyCode: keyCode    ;</div><div class='line' id='LC746'>&nbsp;&nbsp;&nbsp;&nbsp;menu: Menu;</div><div class='line' id='LC747'>&nbsp;&nbsp;&nbsp;&nbsp;progressbar: Progressbar;</div><div class='line' id='LC748'>&nbsp;&nbsp;&nbsp;&nbsp;slider: Slider;</div><div class='line' id='LC749'>&nbsp;&nbsp;&nbsp;&nbsp;spinner: Spinner;</div><div class='line' id='LC750'>&nbsp;&nbsp;&nbsp;&nbsp;tabs: Tabs;</div><div class='line' id='LC751'>&nbsp;&nbsp;&nbsp;&nbsp;tooltip: Tooltip;</div><div class='line' id='LC752'>&nbsp;&nbsp;&nbsp;&nbsp;version: string;</div><div class='line' id='LC753'>}</div><div class='line' id='LC754'><br/></div><div class='line' id='LC755'><br/></div><div class='line' id='LC756'>// Widget //////////////////////////////////////////////////</div><div class='line' id='LC757'><br/></div><div class='line' id='LC758'>interface WidgetOptions {</div><div class='line' id='LC759'>&nbsp;&nbsp;&nbsp;&nbsp;disabled?: bool;</div><div class='line' id='LC760'>&nbsp;&nbsp;&nbsp;&nbsp;hide?: any;</div><div class='line' id='LC761'>&nbsp;&nbsp;&nbsp;&nbsp;show?: any;</div><div class='line' id='LC762'>}</div><div class='line' id='LC763'><br/></div><div class='line' id='LC764'>interface Widget {</div><div class='line' id='LC765'>&nbsp;&nbsp;&nbsp;&nbsp;(methodName: string): JQuery;</div><div class='line' id='LC766'>&nbsp;&nbsp;&nbsp;&nbsp;(options: WidgetOptions): JQuery;</div><div class='line' id='LC767'>&nbsp;&nbsp;&nbsp;&nbsp;(options: AccordionOptions): JQuery;</div><div class='line' id='LC768'>&nbsp;&nbsp;&nbsp;&nbsp;(optionLiteral: string, optionName: string): any;</div><div class='line' id='LC769'>&nbsp;&nbsp;&nbsp;&nbsp;(optionLiteral: string, options: WidgetOptions): any;</div><div class='line' id='LC770'>&nbsp;&nbsp;&nbsp;&nbsp;(optionLiteral: string, optionName: string, optionValue: any): JQuery;</div><div class='line' id='LC771'><br/></div><div class='line' id='LC772'>&nbsp;&nbsp;&nbsp;&nbsp;(name: string, prototype: any): JQuery;</div><div class='line' id='LC773'>&nbsp;&nbsp;&nbsp;&nbsp;(name: string, base: Function, prototype: any): JQuery;</div><div class='line' id='LC774'>}</div><div class='line' id='LC775'><br/></div><div class='line' id='LC776'>////////////////////////////////////////////////////////////////////////////////////////////////////</div><div class='line' id='LC777'><br/></div><div class='line' id='LC778'>interface JQuery {</div><div class='line' id='LC779'><br/></div><div class='line' id='LC780'>&nbsp;&nbsp;&nbsp;&nbsp;accordion(): JQuery;</div><div class='line' id='LC781'>&nbsp;&nbsp;&nbsp;&nbsp;accordion(methodName: string): JQuery;</div><div class='line' id='LC782'>&nbsp;&nbsp;&nbsp;&nbsp;accordion(options: AccordionOptions): JQuery;</div><div class='line' id='LC783'>&nbsp;&nbsp;&nbsp;&nbsp;accordion(optionLiteral: string, optionName: string): any;</div><div class='line' id='LC784'>&nbsp;&nbsp;&nbsp;&nbsp;accordion(optionLiteral: string, options: AccordionOptions): any;</div><div class='line' id='LC785'>&nbsp;&nbsp;&nbsp;&nbsp;accordion(optionLiteral: string, optionName: string, optionValue: any): JQuery;</div><div class='line' id='LC786'><br/></div><div class='line' id='LC787'>&nbsp;&nbsp;&nbsp;&nbsp;autocomplete(): JQuery;</div><div class='line' id='LC788'>&nbsp;&nbsp;&nbsp;&nbsp;autocomplete(methodName: string): JQuery;</div><div class='line' id='LC789'>&nbsp;&nbsp;&nbsp;&nbsp;autocomplete(options: AutocompleteOptions): JQuery;</div><div class='line' id='LC790'>&nbsp;&nbsp;&nbsp;&nbsp;autocomplete(optionLiteral: string, optionName: string): any;</div><div class='line' id='LC791'>&nbsp;&nbsp;&nbsp;&nbsp;autocomplete(optionLiteral: string, options: AutocompleteOptions): any;</div><div class='line' id='LC792'>&nbsp;&nbsp;&nbsp;&nbsp;autocomplete(optionLiteral: string, optionName: string, optionValue: any): JQuery;</div><div class='line' id='LC793'><br/></div><div class='line' id='LC794'>&nbsp;&nbsp;&nbsp;&nbsp;button(): JQuery;</div><div class='line' id='LC795'>&nbsp;&nbsp;&nbsp;&nbsp;button(methodName: string): JQuery;</div><div class='line' id='LC796'>&nbsp;&nbsp;&nbsp;&nbsp;button(options: ButtonOptions): JQuery;</div><div class='line' id='LC797'>&nbsp;&nbsp;&nbsp;&nbsp;button(optionLiteral: string, optionName: string): any;</div><div class='line' id='LC798'>&nbsp;&nbsp;&nbsp;&nbsp;button(optionLiteral: string, options: ButtonOptions): any;</div><div class='line' id='LC799'>&nbsp;&nbsp;&nbsp;&nbsp;button(optionLiteral: string, optionName: string, optionValue: any): JQuery;</div><div class='line' id='LC800'><br/></div><div class='line' id='LC801'>&nbsp;&nbsp;&nbsp;&nbsp;buttonset(): JQuery;</div><div class='line' id='LC802'>&nbsp;&nbsp;&nbsp;&nbsp;buttonset(methodName: string): JQuery;</div><div class='line' id='LC803'>&nbsp;&nbsp;&nbsp;&nbsp;buttonset(options: ButtonOptions): JQuery;</div><div class='line' id='LC804'>&nbsp;&nbsp;&nbsp;&nbsp;buttonset(optionLiteral: string, optionName: string): any;</div><div class='line' id='LC805'>&nbsp;&nbsp;&nbsp;&nbsp;buttonset(optionLiteral: string, options: ButtonOptions): any;</div><div class='line' id='LC806'>&nbsp;&nbsp;&nbsp;&nbsp;buttonset(optionLiteral: string, optionName: string, optionValue: any): JQuery;</div><div class='line' id='LC807'><br/></div><div class='line' id='LC808'>&nbsp;&nbsp;&nbsp;&nbsp;datepicker(): JQuery;</div><div class='line' id='LC809'>&nbsp;&nbsp;&nbsp;&nbsp;datepicker(methodName: string): JQuery;</div><div class='line' id='LC810'>&nbsp;&nbsp;&nbsp;&nbsp;datepicker(options: DatepickerOptions): JQuery;</div><div class='line' id='LC811'>&nbsp;&nbsp;&nbsp;&nbsp;datepicker(optionLiteral: string, optionName: string): any;</div><div class='line' id='LC812'>&nbsp;&nbsp;&nbsp;&nbsp;datepicker(optionLiteral: string, options: DatepickerOptions): any;</div><div class='line' id='LC813'>&nbsp;&nbsp;&nbsp;&nbsp;datepicker(optionLiteral: string, optionName: string, optionValue: any): JQuery;</div><div class='line' id='LC814'><br/></div><div class='line' id='LC815'>&nbsp;&nbsp;&nbsp;&nbsp;dialog(): JQuery;</div><div class='line' id='LC816'>&nbsp;&nbsp;&nbsp;&nbsp;dialog(methodName: string): JQuery;</div><div class='line' id='LC817'>&nbsp;&nbsp;&nbsp;&nbsp;dialog(options: DialogOptions): JQuery;</div><div class='line' id='LC818'>&nbsp;&nbsp;&nbsp;&nbsp;dialog(optionLiteral: string, optionName: string): any;</div><div class='line' id='LC819'>&nbsp;&nbsp;&nbsp;&nbsp;dialog(optionLiteral: string, options: DialogOptions): any;</div><div class='line' id='LC820'>&nbsp;&nbsp;&nbsp;&nbsp;dialog(optionLiteral: string, optionName: string, optionValue: any): JQuery;</div><div class='line' id='LC821'><br/></div><div class='line' id='LC822'>&nbsp;&nbsp;&nbsp;&nbsp;draggable(): JQuery;</div><div class='line' id='LC823'>&nbsp;&nbsp;&nbsp;&nbsp;draggable(methodName: string): JQuery;</div><div class='line' id='LC824'>&nbsp;&nbsp;&nbsp;&nbsp;draggable(options: DraggableOptions): JQuery;</div><div class='line' id='LC825'>&nbsp;&nbsp;&nbsp;&nbsp;draggable(optionLiteral: string, optionName: string): any;</div><div class='line' id='LC826'>&nbsp;&nbsp;&nbsp;&nbsp;draggable(optionLiteral: string, options: DraggableOptions): any;</div><div class='line' id='LC827'>&nbsp;&nbsp;&nbsp;&nbsp;draggable(optionLiteral: string, optionName: string, optionValue: any): JQuery;</div><div class='line' id='LC828'><br/></div><div class='line' id='LC829'>&nbsp;&nbsp;&nbsp;&nbsp;droppable(): JQuery;</div><div class='line' id='LC830'>&nbsp;&nbsp;&nbsp;&nbsp;droppable(methodName: string): JQuery;</div><div class='line' id='LC831'>&nbsp;&nbsp;&nbsp;&nbsp;droppable(options: DroppableOptions): JQuery;</div><div class='line' id='LC832'>&nbsp;&nbsp;&nbsp;&nbsp;droppable(optionLiteral: string, optionName: string): any;</div><div class='line' id='LC833'>&nbsp;&nbsp;&nbsp;&nbsp;droppable(optionLiteral: string, options: DraggableOptions): any;</div><div class='line' id='LC834'>&nbsp;&nbsp;&nbsp;&nbsp;droppable(optionLiteral: string, optionName: string, optionValue: any): JQuery;</div><div class='line' id='LC835'><br/></div><div class='line' id='LC836'>&nbsp;&nbsp;&nbsp;&nbsp;menu(): JQuery;</div><div class='line' id='LC837'>&nbsp;&nbsp;&nbsp;&nbsp;menu(methodName: string): JQuery;</div><div class='line' id='LC838'>&nbsp;&nbsp;&nbsp;&nbsp;menu(options: MenuOptions): JQuery;</div><div class='line' id='LC839'>&nbsp;&nbsp;&nbsp;&nbsp;menu(optionLiteral: string, optionName: string): any;</div><div class='line' id='LC840'>&nbsp;&nbsp;&nbsp;&nbsp;menu(optionLiteral: string, options: MenuOptions): any;</div><div class='line' id='LC841'>&nbsp;&nbsp;&nbsp;&nbsp;menu(optionLiteral: string, optionName: string, optionValue: any): JQuery;</div><div class='line' id='LC842'><br/></div><div class='line' id='LC843'>&nbsp;&nbsp;&nbsp;&nbsp;progressbar(): JQuery;</div><div class='line' id='LC844'>&nbsp;&nbsp;&nbsp;&nbsp;progressbar(methodName: string): JQuery;</div><div class='line' id='LC845'>&nbsp;&nbsp;&nbsp;&nbsp;progressbar(options: ProgressbarOptions): JQuery;</div><div class='line' id='LC846'>&nbsp;&nbsp;&nbsp;&nbsp;progressbar(optionLiteral: string, optionName: string): any;</div><div class='line' id='LC847'>&nbsp;&nbsp;&nbsp;&nbsp;progressbar(optionLiteral: string, options: ProgressbarOptions): any;</div><div class='line' id='LC848'>&nbsp;&nbsp;&nbsp;&nbsp;progressbar(optionLiteral: string, optionName: string, optionValue: any): JQuery;</div><div class='line' id='LC849'><br/></div><div class='line' id='LC850'>&nbsp;&nbsp;&nbsp;&nbsp;resizable(): JQuery;</div><div class='line' id='LC851'>&nbsp;&nbsp;&nbsp;&nbsp;resizable(methodName: string): JQuery;</div><div class='line' id='LC852'>&nbsp;&nbsp;&nbsp;&nbsp;resizable(options: ResizableOptions): JQuery;</div><div class='line' id='LC853'>&nbsp;&nbsp;&nbsp;&nbsp;resizable(optionLiteral: string, optionName: string): any;</div><div class='line' id='LC854'>&nbsp;&nbsp;&nbsp;&nbsp;resizable(optionLiteral: string, options: ResizableOptions): any;</div><div class='line' id='LC855'>&nbsp;&nbsp;&nbsp;&nbsp;resizable(optionLiteral: string, optionName: string, optionValue: any): JQuery;</div><div class='line' id='LC856'><br/></div><div class='line' id='LC857'>&nbsp;&nbsp;&nbsp;&nbsp;selectable(): JQuery;</div><div class='line' id='LC858'>&nbsp;&nbsp;&nbsp;&nbsp;selectable(methodName: string): JQuery;</div><div class='line' id='LC859'>&nbsp;&nbsp;&nbsp;&nbsp;selectable(options: SelectableOptions): JQuery;</div><div class='line' id='LC860'>&nbsp;&nbsp;&nbsp;&nbsp;selectable(optionLiteral: string, optionName: string): any;</div><div class='line' id='LC861'>&nbsp;&nbsp;&nbsp;&nbsp;selectable(optionLiteral: string, options: SelectableOptions): any;</div><div class='line' id='LC862'>&nbsp;&nbsp;&nbsp;&nbsp;selectable(optionLiteral: string, optionName: string, optionValue: any): JQuery;</div><div class='line' id='LC863'><br/></div><div class='line' id='LC864'>&nbsp;&nbsp;&nbsp;&nbsp;slider(): JQuery;</div><div class='line' id='LC865'>&nbsp;&nbsp;&nbsp;&nbsp;slider(methodName: string): JQuery;</div><div class='line' id='LC866'>&nbsp;&nbsp;&nbsp;&nbsp;slider(options: SliderOptions): JQuery;</div><div class='line' id='LC867'>&nbsp;&nbsp;&nbsp;&nbsp;slider(optionLiteral: string, optionName: string): any;</div><div class='line' id='LC868'>&nbsp;&nbsp;&nbsp;&nbsp;slider(optionLiteral: string, options: SliderOptions): any;</div><div class='line' id='LC869'>&nbsp;&nbsp;&nbsp;&nbsp;slider(optionLiteral: string, optionName: string, optionValue: any): JQuery;</div><div class='line' id='LC870'><br/></div><div class='line' id='LC871'>&nbsp;&nbsp;&nbsp;&nbsp;sortable(): JQuery;</div><div class='line' id='LC872'>&nbsp;&nbsp;&nbsp;&nbsp;sortable(methodName: string): JQuery;</div><div class='line' id='LC873'>&nbsp;&nbsp;&nbsp;&nbsp;sortable(options: SortableOptions): JQuery;</div><div class='line' id='LC874'>&nbsp;&nbsp;&nbsp;&nbsp;sortable(optionLiteral: string, optionName: string): any;</div><div class='line' id='LC875'>&nbsp;&nbsp;&nbsp;&nbsp;sortable(optionLiteral: string, options: SortableOptions): any;</div><div class='line' id='LC876'>&nbsp;&nbsp;&nbsp;&nbsp;sortable(optionLiteral: string, optionName: string, optionValue: any): JQuery;</div><div class='line' id='LC877'><br/></div><div class='line' id='LC878'>&nbsp;&nbsp;&nbsp;&nbsp;spinner(): JQuery;</div><div class='line' id='LC879'>&nbsp;&nbsp;&nbsp;&nbsp;spinner(methodName: string): JQuery;</div><div class='line' id='LC880'>&nbsp;&nbsp;&nbsp;&nbsp;spinner(options: SpinnerOptions): JQuery;</div><div class='line' id='LC881'>&nbsp;&nbsp;&nbsp;&nbsp;spinner(optionLiteral: string, optionName: string): any;</div><div class='line' id='LC882'>&nbsp;&nbsp;&nbsp;&nbsp;spinner(optionLiteral: string, options: SpinnerOptions): any;</div><div class='line' id='LC883'>&nbsp;&nbsp;&nbsp;&nbsp;spinner(optionLiteral: string, optionName: string, optionValue: any): JQuery;</div><div class='line' id='LC884'><br/></div><div class='line' id='LC885'>&nbsp;&nbsp;&nbsp;&nbsp;tabs(): JQuery;</div><div class='line' id='LC886'>&nbsp;&nbsp;&nbsp;&nbsp;tabs(methodName: string): JQuery;</div><div class='line' id='LC887'>&nbsp;&nbsp;&nbsp;&nbsp;tabs(options: TabsOptions): JQuery;</div><div class='line' id='LC888'>&nbsp;&nbsp;&nbsp;&nbsp;tabs(optionLiteral: string, optionName: string): any;</div><div class='line' id='LC889'>&nbsp;&nbsp;&nbsp;&nbsp;tabs(optionLiteral: string, options: TabsOptions): any;</div><div class='line' id='LC890'>&nbsp;&nbsp;&nbsp;&nbsp;tabs(optionLiteral: string, optionName: string, optionValue: any): JQuery;</div><div class='line' id='LC891'><br/></div><div class='line' id='LC892'>&nbsp;&nbsp;&nbsp;&nbsp;tooltip(): JQuery;</div><div class='line' id='LC893'>&nbsp;&nbsp;&nbsp;&nbsp;tooltip(methodName: string): JQuery;</div><div class='line' id='LC894'>&nbsp;&nbsp;&nbsp;&nbsp;tooltip(options: TooltipOptions): JQuery;</div><div class='line' id='LC895'>&nbsp;&nbsp;&nbsp;&nbsp;tooltip(optionLiteral: string, optionName: string): any;</div><div class='line' id='LC896'>&nbsp;&nbsp;&nbsp;&nbsp;tooltip(optionLiteral: string, options: TooltipOptions): any;</div><div class='line' id='LC897'>&nbsp;&nbsp;&nbsp;&nbsp;tooltip(optionLiteral: string, optionName: string, optionValue: any): JQuery;</div><div class='line' id='LC898'><br/></div><div class='line' id='LC899'><br/></div><div class='line' id='LC900'>&nbsp;&nbsp;&nbsp;&nbsp;addClass(classNames: string, speed?: number, callback?: Function): JQuery;</div><div class='line' id='LC901'>&nbsp;&nbsp;&nbsp;&nbsp;addClass(classNames: string, speed?: string, callback?: Function): JQuery;</div><div class='line' id='LC902'>&nbsp;&nbsp;&nbsp;&nbsp;addClass(classNames: string, speed?: number, easing?: string, callback?: Function): JQuery;</div><div class='line' id='LC903'>&nbsp;&nbsp;&nbsp;&nbsp;addClass(classNames: string, speed?: string, easing?: string, callback?: Function): JQuery;</div><div class='line' id='LC904'><br/></div><div class='line' id='LC905'>&nbsp;&nbsp;&nbsp;&nbsp;removeClass(classNames: string, speed?: number, callback?: Function): JQuery;</div><div class='line' id='LC906'>&nbsp;&nbsp;&nbsp;&nbsp;removeClass(classNames: string, speed?: string, callback?: Function): JQuery;</div><div class='line' id='LC907'>&nbsp;&nbsp;&nbsp;&nbsp;removeClass(classNames: string, speed?: number, easing?: string, callback?: Function): JQuery;</div><div class='line' id='LC908'>&nbsp;&nbsp;&nbsp;&nbsp;removeClass(classNames: string, speed?: string, easing?: string, callback?: Function): JQuery;</div><div class='line' id='LC909'><br/></div><div class='line' id='LC910'>&nbsp;&nbsp;&nbsp;&nbsp;switchClass(removeClassName: string, addClassName: string, duration?: number, easing?: string, complete?: Function): JQuery;</div><div class='line' id='LC911'>&nbsp;&nbsp;&nbsp;&nbsp;switchClass(removeClassName: string, addClassName: string, duration?: string, easing?: string, complete?: Function): JQuery;</div><div class='line' id='LC912'><br/></div><div class='line' id='LC913'>&nbsp;&nbsp;&nbsp;&nbsp;toggleClass(className: string, duration?: number, easing?: string, complete?: Function): JQuery;</div><div class='line' id='LC914'>&nbsp;&nbsp;&nbsp;&nbsp;toggleClass(className: string, duration?: string, easing?: string, complete?: Function): JQuery;</div><div class='line' id='LC915'>&nbsp;&nbsp;&nbsp;&nbsp;toggleClass(className: string, aswitch?: bool, duration?: number, easing?: string, complete?: Function): JQuery;</div><div class='line' id='LC916'>&nbsp;&nbsp;&nbsp;&nbsp;toggleClass(className: string, aswitch?: bool, duration?: string, easing?: string, complete?: Function): JQuery;</div><div class='line' id='LC917'><br/></div><div class='line' id='LC918'>&nbsp;&nbsp;&nbsp;&nbsp;effect(options: any): JQuery;</div><div class='line' id='LC919'>&nbsp;&nbsp;&nbsp;&nbsp;effect(effect: string, options?: any, duration?: number, complete?: Function): JQuery;</div><div class='line' id='LC920'>&nbsp;&nbsp;&nbsp;&nbsp;effect(effect: string, options?: any, duration?: string, complete?: Function): JQuery;</div><div class='line' id='LC921'><br/></div><div class='line' id='LC922'>&nbsp;&nbsp;&nbsp;&nbsp;hide(options: any): JQuery;</div><div class='line' id='LC923'>&nbsp;&nbsp;&nbsp;&nbsp;hide(effect: string, options?: any, duration?: number, complete?: Function): JQuery;</div><div class='line' id='LC924'>&nbsp;&nbsp;&nbsp;&nbsp;hide(effect: string, options?: any, duration?: string, complete?: Function): JQuery;</div><div class='line' id='LC925'><br/></div><div class='line' id='LC926'>&nbsp;&nbsp;&nbsp;&nbsp;show(options: any): JQuery;</div><div class='line' id='LC927'>&nbsp;&nbsp;&nbsp;&nbsp;show(effect: string, options?: any, duration?: number, complete?: Function): JQuery;</div><div class='line' id='LC928'>&nbsp;&nbsp;&nbsp;&nbsp;show(effect: string, options?: any, duration?: string, complete?: Function): JQuery;</div><div class='line' id='LC929'><br/></div><div class='line' id='LC930'>&nbsp;&nbsp;&nbsp;&nbsp;toggle(options: any): JQuery;</div><div class='line' id='LC931'>&nbsp;&nbsp;&nbsp;&nbsp;toggle(effect: string, options?: any, duration?: number, complete?: Function): JQuery;</div><div class='line' id='LC932'>&nbsp;&nbsp;&nbsp;&nbsp;toggle(effect: string, options?: any, duration?: string, complete?: Function): JQuery;</div><div class='line' id='LC933'><br/></div><div class='line' id='LC934'>&nbsp;&nbsp;&nbsp;&nbsp;enableSelection(): JQuery;</div><div class='line' id='LC935'>&nbsp;&nbsp;&nbsp;&nbsp;disableSelection(): JQuery;</div><div class='line' id='LC936'>&nbsp;&nbsp;&nbsp;&nbsp;focus(delay: number, callback?: Function): JQuery;</div><div class='line' id='LC937'>&nbsp;&nbsp;&nbsp;&nbsp;uniqueId(): JQuery;</div><div class='line' id='LC938'>&nbsp;&nbsp;&nbsp;&nbsp;removeUniqueId(): JQuery;</div><div class='line' id='LC939'>&nbsp;&nbsp;&nbsp;&nbsp;scrollParent(): JQuery;</div><div class='line' id='LC940'>&nbsp;&nbsp;&nbsp;&nbsp;zIndex(): JQuery;</div><div class='line' id='LC941'>&nbsp;&nbsp;&nbsp;&nbsp;zIndex(zIndex: number): JQuery;</div><div class='line' id='LC942'>&nbsp;&nbsp;&nbsp;&nbsp;position(options: JQueryPositionOptions): JQuery;</div><div class='line' id='LC943'><br/></div><div class='line' id='LC944'>&nbsp;&nbsp;&nbsp;&nbsp;widget: Widget;</div><div class='line' id='LC945'><br/></div><div class='line' id='LC946'>&nbsp;&nbsp;&nbsp;&nbsp;jQuery: JQueryStatic;</div><div class='line' id='LC947'>}</div><div class='line' id='LC948'><br/></div><div class='line' id='LC949'>interface JQueryStatic {</div><div class='line' id='LC950'>&nbsp;&nbsp;&nbsp;&nbsp;ui: UI;</div><div class='line' id='LC951'>&nbsp;&nbsp;&nbsp;&nbsp;datepicker: Datepicker;</div><div class='line' id='LC952'>&nbsp;&nbsp;&nbsp;&nbsp;widget: Widget;</div><div class='line' id='LC953'>&nbsp;&nbsp;&nbsp;&nbsp;Widget: Widget;</div><div class='line' id='LC954'>}</div></pre></div>
          </td>
        </tr>
      </table>
  </div>

          </div>
        </div>

        <a href="#jump-to-line" rel="facebox" data-hotkey="l" class="js-jump-to-line" style="display:none">Jump to Line</a>
        <div id="jump-to-line" style="display:none">
          <h2>Jump to Line</h2>
          <form accept-charset="UTF-8" class="js-jump-to-line-form">
            <input class="textfield js-jump-to-line-field" type="text">
            <div class="full-button">
              <button type="submit" class="button">Go</button>
            </div>
          </form>
        </div>

      </div>
    </div>
</div>

<div id="js-frame-loading-template" class="frame frame-loading large-loading-area" style="display:none;">
  <img class="js-frame-loading-spinner" src="https://a248.e.akamai.net/assets.github.com/images/spinners/octocat-spinner-128.gif?1360648847" height="64" width="64">
</div>


        </div>
      </div>
      <div class="context-overlay"></div>
    </div>

      <div id="footer-push"></div><!-- hack for sticky footer -->
    </div><!-- end of wrapper - hack for sticky footer -->

      <!-- footer -->
      <div id="footer">
  <div class="container clearfix">

      <dl class="footer_nav">
        <dt>GitHub</dt>
        <dd><a href="https://github.com/about">About us</a></dd>
        <dd><a href="https://github.com/blog">Blog</a></dd>
        <dd><a href="https://github.com/contact">Contact &amp; support</a></dd>
        <dd><a href="http://enterprise.github.com/">GitHub Enterprise</a></dd>
        <dd><a href="http://status.github.com/">Site status</a></dd>
      </dl>

      <dl class="footer_nav">
        <dt>Applications</dt>
        <dd><a href="http://mac.github.com/">GitHub for Mac</a></dd>
        <dd><a href="http://windows.github.com/">GitHub for Windows</a></dd>
        <dd><a href="http://eclipse.github.com/">GitHub for Eclipse</a></dd>
        <dd><a href="http://mobile.github.com/">GitHub mobile apps</a></dd>
      </dl>

      <dl class="footer_nav">
        <dt>Services</dt>
        <dd><a href="http://get.gaug.es/">Gauges: Web analytics</a></dd>
        <dd><a href="http://speakerdeck.com">Speaker Deck: Presentations</a></dd>
        <dd><a href="https://gist.github.com">Gist: Code snippets</a></dd>
        <dd><a href="http://jobs.github.com/">Job board</a></dd>
      </dl>

      <dl class="footer_nav">
        <dt>Documentation</dt>
        <dd><a href="http://help.github.com/">GitHub Help</a></dd>
        <dd><a href="http://developer.github.com/">Developer API</a></dd>
        <dd><a href="http://github.github.com/github-flavored-markdown/">GitHub Flavored Markdown</a></dd>
        <dd><a href="http://pages.github.com/">GitHub Pages</a></dd>
      </dl>

      <dl class="footer_nav">
        <dt>More</dt>
        <dd><a href="http://training.github.com/">Training</a></dd>
        <dd><a href="https://github.com/edu">Students &amp; teachers</a></dd>
        <dd><a href="http://shop.github.com">The Shop</a></dd>
        <dd><a href="/plans">Plans &amp; pricing</a></dd>
        <dd><a href="http://octodex.github.com/">The Octodex</a></dd>
      </dl>

      <hr class="footer-divider">


    <p class="right">&copy; 2013 <span title="0.07311s from fe4.rs.github.com">GitHub</span>, Inc. All rights reserved.</p>
    <a class="left" href="https://github.com/">
      <span class="mega-icon mega-icon-invertocat"></span>
    </a>
    <ul id="legal">
        <li><a href="https://github.com/site/terms">Terms of Service</a></li>
        <li><a href="https://github.com/site/privacy">Privacy</a></li>
        <li><a href="https://github.com/security">Security</a></li>
    </ul>

  </div><!-- /.container -->

</div><!-- /.#footer -->


    <div class="fullscreen-overlay js-fullscreen-overlay" id="fullscreen_overlay">
  <div class="fullscreen-container js-fullscreen-container">
    <div class="textarea-wrap">
      <textarea name="fullscreen-contents" id="fullscreen-contents" class="js-fullscreen-contents" placeholder="" data-suggester="fullscreen_suggester"></textarea>
          <div class="suggester-container">
              <div class="suggester fullscreen-suggester js-navigation-container" id="fullscreen_suggester"
                 data-url="/borisyankov/DefinitelyTyped/suggestions/commit">
              </div>
          </div>
    </div>
  </div>
  <div class="fullscreen-sidebar">
    <a href="#" class="exit-fullscreen js-exit-fullscreen tooltipped leftwards" title="Exit Zen Mode">
      <span class="mega-icon mega-icon-normalscreen"></span>
    </a>
    <a href="#" class="theme-switcher js-theme-switcher tooltipped leftwards"
      title="Switch themes">
      <span class="mini-icon mini-icon-brightness"></span>
    </a>
  </div>
</div>



    <div id="ajax-error-message" class="flash flash-error">
      <span class="mini-icon mini-icon-exclamation"></span>
      Something went wrong with that request. Please try again.
      <a href="#" class="mini-icon mini-icon-remove-close ajax-error-dismiss"></a>
    </div>

    
    
    <span id='server_response_time' data-time='0.07360' data-host='fe4'></span>
    
  </body>
</html>

