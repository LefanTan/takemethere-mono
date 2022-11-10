var o=class{constructor(e,t,r,l,s,n,i){this.appId=e;this.propertyId=t;this.eventId=r;this.sessionId=l;this.userAgent=s;this.referrer=n;this.eventProperties=i}toString(){return`
        appId - ${this.appId}
        propertyId - ${this.propertyId}
        eventId - ${this.eventId}
        eventProperties - ${JSON.stringify(this.eventProperties)}
        sessionId - ${this.sessionId}
        userAgent - ${this.userAgent}
        referrer - ${this.referrer}
    `}format(){return JSON.stringify(this)}},a=class{constructor(e,t,r,l){this.appId=e;this.propertyId=t;this.endpoint=r;this.devMode=l;var n;this.ua=navigator.userAgent,this.referrer=document.referrer;let s=(n=document.cookie.split("; ").find(i=>i.startsWith(`${e}_${t}=`)))==null?void 0:n.split("=")[1];if(s)this.isFirstTime=!1,this.sessionId=s;else{let i=new Date;i.setTime(new Date().getTime()+3*60*1e3),this.sessionId=crypto.randomUUID(),document.cookie=`${e}_${t}=${this.sessionId}; expires=${i.toUTCString()}; Secure; SameSite=Strict;`,this.isFirstTime=!0,this.logAnalytic("FirstPageVisit")}window.addEventListener("beforeunload",()=>{document.cookie=`${e}_session=${this.sessionId}; expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; SameSite=Strict; path=/`})}logAnalytic(e,t){let r=new o(this.appId,this.propertyId,e,this.sessionId,this.ua,this.referrer,t);navigator.sendBeacon(this.endpoint,r.format()),this.devMode&&console.log("Sent Analytic: "+r.toString())}isNewSession(){return this.isFirstTime}};export{o as AnalyticRecord,a as AnalyticTracker};
//# sourceMappingURL=index.js.map
