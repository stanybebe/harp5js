#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D uNoiseTexture;

varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying highp vec2 vertTexCoord;
uniform float red;
uniform float green;
uniform float blue;

void main() {
  float intensity;
 
  intensity = max(0.0, dot(vertLightDir, vertNormal));
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec4 tex = texture2D(uNoiseTexture, vertTexCoord*.5);  
    vec3 color = vec3(red,green,blue);
    vec3 colorB = vec3(blue-.3,green-.3,red-.3);
    vec3 pixi;
    if (tex.x==1.){
        pixi = color;
    }
    else{
        pixi = colorB;
    }

    gl_FragColor = vec4(pixi,1.);
}