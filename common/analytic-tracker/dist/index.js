var o=class{constructor(e,r,s,i,n,t,p){this.appId=e;this.propertyId=r;this.eventId=s;this.sessionId=i;this.userAgent=n;this.referrer=t;this.eventProperties=p}toString(){return`
        appId - ${this.appId}
        eventId - ${this.eventId}
        eventProperties - ${this.eventProperties}
        sessionId - ${this.sessionId}
        userAgent - ${this.userAgent}
        referrer - ${this.referrer}
    `}format(){return JSON.stringify(this)}},a=class{constructor(e,r,s){this.appId=e;this.propertyId=r;this.endpoint=s;var n;this.ua=navigator.userAgent,this.referrer=document.referrer;let i=(n=document.cookie.split("; ").find(t=>t.startsWith(`${e}_session=`)))==null?void 0:n.split("=")[1];if(i)this.sessionId=i;else{let t=new Date;t.setTime(new Date().getTime()+1*60*60*1e3),this.sessionId=crypto.randomUUID(),document.cookie=`${e}_session=${this.sessionId}; expires=${t.toUTCString()}; Secure; SameSite=Strict`,this.logAnalytic("FirstPageVisit")}window.addEventListener("beforeunload",()=>{document.cookie=`${e}_session=${this.sessionId}; expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; SameSite=Strict; path=/`})}logAnalytic(e,r){let s=new o(this.appId,this.propertyId,e,this.sessionId,this.ua,this.referrer,r);console.log("Sent Analytic: "+s.format()),navigator.sendBeacon(this.endpoint,s.format())}isNewSession(){return!1}};export{o as AnalyticRecord,a as AnalyticTracker};
//# sourceMappingURL=index.js.map
