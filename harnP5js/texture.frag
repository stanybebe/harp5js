#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform float speed;
uniform float offset;
uniform float amp;
uniform float red;
uniform float green;
uniform float blue;


vec2 hash( vec2 x )
{
    const vec2 k = vec2( 0.3183099, 0.3678794 );
    x = x*k + k.yx;
    return -1.0 + 2.0*sin(u_time*speed)*amp*fract( 16.0 * k*fract( x.x*x.y*(x.x+x.y)) );
}

float noise( in vec2 p )
{
    vec2 i = floor( p );
    vec2 f = fract( p );

	vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( hash( i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( hash( i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( hash( i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( hash( i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}

void main()
{

    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    vec2 r = vec2( gl_FragCoord.xy - u_resolution.xy );
	r = r.xy / u_resolution.xy;
    float n = noise(offset*uv);
    float width = .5;


    vec3 colorb = vec3(0.);
    vec3 colorc = vec3(1.);
    vec3 pixi;
    float noiseh = sin(dot(width,r.x*amp)*amp*n*(colorc.x));
    if(sin(u_time*speed+offset)*r.x> noiseh){

        pixi = colorc;

    	}
    else{pixi = colorb;}
    


    gl_FragColor = vec4(pixi,1.0);
}