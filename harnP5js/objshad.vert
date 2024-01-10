uniform vec2 u_resolution;
attribute vec3 aPosition;
attribute vec3 aNormal;
attribute vec2 aTexCoord;
attribute vec4 aVertexColor;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat3 uNormalMatrix;

uniform int uDirectionalLightCount;
uniform vec3 uLightingDirection;
uniform vec3 uDirectionalColor;
uniform vec4 uMaterialColor;

varying vec4 vertColor;
varying vec3 vertLightDir;
varying vec3 vertNormal;
varying vec2 vertTexCoord;
uniform float uFrameCount;
uniform float mX;

// Get the noise texture
uniform sampler2D uNoiseTexture;

varying vec2 vTexCoord;

vec2 hash( vec2 x )
{
    const vec2 k = vec2( 0.3183099, 0.3678794 );
    x = x*k + k.yx;
    return -1.0 + 2.0*fract( 16.0 * k*fract( x.x*x.y*(x.x+x.y)) );
}

float noisee( in vec2 p )
{
    vec2 i = floor( p );
    vec2 f = fract( p );

	vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( hash( i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( hash( i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( hash( i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( hash( i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}


void main() {
     
 
   vec2 uv =vec2(2.,3.);
  
  float tile = .5;
  float speed = 0.;
  vec4 noise = texture2D(uNoiseTexture, sin(aTexCoord * tile + uFrameCount * speed));
  vec4 positionVec4 = vec4(aPosition, 1.0);
  
   float amplitude = mX*100.;
  // add the noise to the position, and multiply by the normal to move along it. 
   positionVec4.y += noise.y * aNormal.y * amplitude ;
  
  //  positionVec4.y += cos(  (uFrameCount*mX)) * aNormal.y * amplitude * cos(positionVec4.x + uFrameCount*.05);
  

 
 ;
  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;

  vertNormal = normalize(uNormalMatrix * aNormal);
  vertLightDir = -uLightingDirection;

  vertColor = uMaterialColor;
  vertTexCoord = aTexCoord;
}