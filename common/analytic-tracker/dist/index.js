var o=class{constructor(e,i,s,r,n,t,p){this.appId=e;this.propertyId=i;this.eventId=s;this.sessionId=r;this.userAgent=n;this.referrer=t;this.eventProperties=p}toString(){return`
        appId - ${this.appId}
        propertyId - ${this.propertyId}
        eventId - ${this.eventId}
        eventProperties - ${this.eventProperties}
        sessionId - ${this.sessionId}
        userAgent - ${this.userAgent}
        referrer - ${this.referrer}
    `}format(){return JSON.stringify(this)}},a=class{constructor(e,i,s){this.appId=e;this.propertyId=i;this.endpoint=s;var n;this.ua=navigator.userAgent,this.referrer=document.referrer;let r=(n=document.cookie.split("; ").find(t=>t.startsWith(`${e}_session=`)))==null?void 0:n.split("=")[1];if(r)this.isFirstTime=!1,this.sessionId=r;else{let t=new Date;t.setTime(new Date().getTime()+1*60*60*1e3),this.sessionId=crypto.randomUUID(),document.cookie=`${e}_session=${this.sessionId}; expires=${t.toUTCString()}; Secure; SameSite=Strict`,this.isFirstTime=!0,this.logAnalytic("FirstPageVisit")}window.addEventListener("beforeunload",()=>{document.cookie=`${e}_session=${this.sessionId}; expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; SameSite=Strict; path=/`})}logAnalytic(e,i){let s=new o(this.appId,this.propertyId,e,this.sessionId,this.ua,this.referrer,i);console.log("Sent Analytic: "+s.toString()),navigator.sendBeacon(this.endpoint,s.format())}isNewSession(){return this.isFirstTime}};export{o as AnalyticRecord,a as AnalyticTracker};
//# sourceMappingURL=index.js.map
