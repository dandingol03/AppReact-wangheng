import React from "react";

var ButtonElement=React.createClass({
    clickCb:function(evt){
        if(this.props.query!==undefined&&this.props.query!==null)
        {
            if(this.props.query.params!==undefined&&this.props.query.params!==undefined)
            {
                $.ajax({
                    type: 'POST',
                    url: this.props.query.url,
                    dataType: 'json',
                    data: this.props.query.params,
                    cache: false,
                    success: function(data) {
                        console.log();
                        console.log();
                        if(this.props.handle!==null&&this.props.handle!==undefined)
                            this.props.handle(data);
                    }.bind(this),
                    error: function(xhr, status, err) {
                        if(xhr.readyStatus===4)
                        {
                            if(xhr.responseText!==undefined&&xht.responseText!==null) {
                                var reg=/Cannot GET \/gradms\/authmsg.jsp/g;
                                if(reg.test(xhr.responseText)==true)
                                {
                                    //TODO:relogin to gradms

                                }
                            }
                        }
                        console.error(this.props.url, status, err.toString());
                    }
                });
            }

        }
        else{
            this.props.handle(evt);
        }
    },
    render:function(){
        var marginStyle={
            marginRight:"20px"
        };


        var buttonClass;
        if(this.props.buttonClass!==undefined&&this.props.buttonClass!==null)
        buttonClass=this.props.buttonClass;
        var title;
        if(this.props.title!==null&&this.props.title!==undefined)
            title=this.props.title;
        var data_toggle;
        if(this.props["data-toggle"]!==null&&this.props["data-toggle"]!==undefined)
        data_toggle=this.props["data-toggle"];
        var arial_hasPopup;
        if(this.props["aria-haspopup"]!==null&&this.props["aria-haspopup"]!==undefined)
        arial_hasPopup=this.props["aria-haspopup"];
        var  aria_expanded;
        if(this.props["aria-expanded"]!==null&&this.props["aria-expanded"]!==undefined)
            aria_expanded=this.props["aria-expanded"];
        return(
            <button type={this.props.type} className={buttonClass} onClick={this.clickCb}
                style={marginStyle} data-toggle={data_toggle} aria-expanded={aria_expanded}>
                {title}
                {this.props.children}
                </button>
        )
    }
});

export default ButtonElement;