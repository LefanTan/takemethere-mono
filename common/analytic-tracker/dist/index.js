var n=class{constructor(s,r,e,i,t,d){this.appId=s;this.eventId=r;this.sessionId=e;this.userAgent=i;this.referrer=t;this.eventProperties=d}toString(){return`
        appId - ${this.appId}
        eventId - ${this.eventId}
        eventProperties - ${this.eventProperties}
        sessionId - ${this.sessionId}
        userAgent - ${this.userAgent}
        referrer - ${this.referrer}
    `}format(){return JSON.stringify(this)}},o=class{constructor(s,r){this.appId=s;this.endpoint=r;var i;this.ua=navigator.userAgent,this.referrer=document.referrer;let e=(i=document.cookie.split("; ").find(t=>t.startsWith(`${s}_session=`)))==null?void 0:i.split("=")[1];if(e)this.sessionId=e;else{let t=new Date;t.setTime(new Date().getTime()+1*60*60*1e3),this.sessionId=crypto.randomUUID(),document.cookie=`${s}_session=${this.sessionId}; expires=${t.toUTCString()}; Secure;`,this.logAnalytic("FirstPageVisit")}}logAnalytic(s,r){let e=new n(this.appId,s,this.sessionId,this.ua,this.referrer,r);console.log("Sent Analytic: "+e.format()),navigator.sendBeacon(this.endpoint,e.format())}isNewSession(){return!1}};export{n as AnalyticRecord,o as AnalyticTracker};
//# sourceMappingURL=index.js.map
