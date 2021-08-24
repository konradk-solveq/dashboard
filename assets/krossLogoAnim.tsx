const AnimKross = () => {
    return (
        <svg
            viewBox="0 0 242 130"
            xmlns="http://www.w3.org/2000/svg"
        >
            <clipPath id="clip">
                <polygon fill="blue" opacity=".3">
                    <animate attributeName="points" begin="0.1s" dur="1s" repeatCount="1" fill="freeze"
                        values="-260,-10 -85,-10 -220,180 -260,180 ; -20,-10 355,-10 220,180 -20,180"></animate>
                </polygon>
            </clipPath>
            <clipPath id="clip2">
                <polygon fill="green" opacity=".3">
                    <animate attributeName="points" begin="0s" dur="1s" repeatCount="1" fill="freeze"
                        values="-25,-10 -85,-10 -220,180 -160,180 ; 415,-10 355,-10 220,180 280,180"></animate>
                </polygon>
            </clipPath>
            <g clip-path="url(#clip)">
                <path
                    fill="#d8232a"
                    fillRule="evenodd"
                    d="M 115.76172 0 C 112.59172 0 109.97378 0.29428125 107.92578 0.86328125 C 105.87878 1.4332812 104.14694 2.1618594 102.71094 3.0058594 C 101.29294 3.8708594 100.07087 4.8120469 99.046875 5.8730469 C 98.102875 6.8540469 55.813438 60.112875 55.773438 60.171875 L 84.123047 81.445312 C 85.148047 81.995312 86.171312 82.605844 87.195312 83.214844 C 88.218312 83.842844 89.439422 84.411828 90.857422 84.923828 C 92.274422 85.433828 94.027219 85.865219 96.074219 86.199219 C 98.102219 86.533219 100.73916 86.710937 103.91016 86.710938 L 123.7168 86.710938 L 89.085938 60.150391 L 135.56836 0 L 115.76172 0 z M 145.64648 21.195312 C 142.87148 21.195312 140.58788 21.452359 138.79688 21.943359 C 137.02488 22.453359 135.50658 23.083125 134.26758 23.828125 C 133.02758 24.575125 131.96413 25.399266 131.07812 26.322266 C 130.25113 27.167266 103.75236 60.073281 103.69336 60.113281 L 144.42773 90.738281 C 145.31373 91.229281 146.21852 91.758062 147.10352 92.289062 C 147.98952 92.839062 149.05492 93.331203 150.29492 93.783203 C 151.53492 94.235203 153.0498 94.587344 154.8418 94.902344 C 156.6318 95.197344 158.89783 95.335937 161.67383 95.335938 L 178.93945 95.335938 L 132.75195 60.111328 L 162.89453 21.195312 L 145.64648 21.195312 z "
                />
                <path
                    fill="#1c1b19"
                    fillRule="evenodd"
                    d="M 19.018,107.102 H 8.15 L 0,129.438 h 0.984 c 1.3,0 2.56,-0.059 3.8,-0.217 1.24,-0.137 2.382,-0.372 3.425,-0.707 1.064,-0.333 1.95,-0.766 2.698,-1.316 0.59,-0.452 1.023,-0.982 1.338,-1.59 z m 28.547,0 h -12.01 l -19.924,11.04 12.128,9.095 c 0.433,0.236 0.847,0.472 1.28,0.747 0.433,0.255 0.945,0.491 1.535,0.708 0.592,0.215 1.34,0.392 2.186,0.53 0.866,0.157 1.95,0.216 3.287,0.216 h 8.309 L 28.9,117.593 47.564,107.102 Z m 97.216,1.218 c -1.555,-0.786 -3.818,-1.18 -6.772,-1.18 H 113.91 c -1.338,0 -2.618,0.1 -3.859,0.316 -1.24,0.216 -2.382,0.53 -3.406,0.942 -1.023,0.393 -1.89,0.884 -2.598,1.454 -0.728,0.57 -1.201,1.199 -1.438,1.867 l -4.862,13.2 c -0.236,0.707 -0.217,1.336 0.099,1.886 0.314,0.55 0.826,1.022 1.535,1.435 0.728,0.392 1.634,0.707 2.717,0.923 1.103,0.215 2.323,0.314 3.662,0.314 h 24.097 c 1.378,0 2.697,-0.078 3.977,-0.236 1.26,-0.176 2.422,-0.451 3.465,-0.825 1.044,-0.392 1.93,-0.845 2.657,-1.395 0.71,-0.55 1.202,-1.218 1.497,-2.042 l 4.784,-13.202 c 0.571,-1.512 0.08,-2.672 -1.457,-3.457 z m -13.603,14.95 c -0.099,0.235 -0.276,0.45 -0.532,0.667 -0.256,0.197 -0.572,0.374 -0.945,0.531 -0.354,0.137 -0.769,0.255 -1.22,0.334 -0.454,0.078 -0.926,0.117 -1.399,0.117 h -18.466 l 4.193,-11.413 c 0.079,-0.236 0.256,-0.472 0.512,-0.668 0.256,-0.196 0.57,-0.373 0.945,-0.53 0.374,-0.138 0.787,-0.255 1.22,-0.334 0.453,-0.08 0.925,-0.118 1.398,-0.118 h 18.486 l -4.193,11.414 z M 95.267,108.359 c -1.516,-0.806 -3.76,-1.218 -6.772,-1.218 H 54.672 l -8.092,22.277 h 1.083 c 1.28,0 2.56,-0.06 3.82,-0.177 1.26,-0.118 2.441,-0.373 3.543,-0.747 2.087,-0.766 3.524,-2.2 4.293,-4.302 l 4.508,-12.336 h 22.03 l -1.575,4.086 c -0.079,0.236 -0.257,0.471 -0.512,0.668 -0.256,0.216 -0.57,0.393 -0.945,0.53 -0.374,0.157 -0.767,0.255 -1.22,0.334 -0.375,0.06 -0.768,0.098 -1.163,0.118 h -16.36 l 1.989,1.453 11.183,8.33 c 0.432,0.256 0.865,0.49 1.28,0.766 0.432,0.256 0.944,0.491 1.554,0.707 0.59,0.216 1.32,0.393 2.166,0.53 0.866,0.139 1.97,0.217 3.288,0.217 h 8.308 l -9.647,-7.289 h 0.551 c 2.442,-0.176 4.47,-0.608 6.083,-1.296 1.91,-0.805 3.131,-1.925 3.643,-3.36 l 2.165,-5.794 c 0.591,-1.532 0.119,-2.691 -1.378,-3.497 m 65.816,4.479 c 0.255,-0.216 0.57,-0.373 0.945,-0.53 0.373,-0.138 0.787,-0.255 1.22,-0.334 0.453,-0.08 0.925,-0.118 1.398,-0.118 h 29.374 c 0.63,-1.611 0.118,-2.81 -1.536,-3.575 -1.634,-0.767 -3.997,-1.14 -7.048,-1.14 h -22.74 c -1.338,0 -2.637,0.099 -3.897,0.295 -1.28,0.177 -2.442,0.491 -3.504,0.923 -1.084,0.432 -2.008,0.963 -2.756,1.61 -0.77,0.63 -1.32,1.415 -1.654,2.319 L 149.526,116 c -0.275,0.806 -0.256,1.494 0.078,2.064 0.336,0.569 0.887,1.06 1.635,1.453 0.767,0.413 1.712,0.708 2.835,0.904 1.121,0.196 2.324,0.275 3.603,0.275 h 23.25 l -1.063,2.848 c -0.078,0.138 -0.196,0.256 -0.354,0.393 -0.256,0.197 -0.571,0.374 -0.945,0.53 -0.374,0.138 -0.787,0.256 -1.24,0.335 -0.434,0.078 -0.906,0.098 -1.398,0.098 h -1.024 v 0.02 h -28.665 c -0.295,0.746 -0.236,1.414 0.137,1.984 0.395,0.588 1.006,1.06 1.833,1.473 0.826,0.412 1.83,0.707 2.991,0.884 1.182,0.196 2.402,0.295 3.702,0.295 h 23.172 c 3.15,0 5.808,-0.373 7.973,-1.14 2.166,-0.766 3.564,-1.965 4.194,-3.576 l 1.574,-4.419 c 0.276,-0.766 0.237,-1.434 -0.156,-2.004 -0.374,-0.57 -0.986,-1.041 -1.812,-1.395 -0.846,-0.353 -1.85,-0.609 -3.051,-0.785 -1.202,-0.157 -2.422,-0.237 -3.72,-0.237 h -23.39 l 0.964,-2.631 c 0.099,-0.197 0.217,-0.374 0.434,-0.53 m 47.702,-0.001 c 0.256,-0.216 0.571,-0.373 0.945,-0.53 0.374,-0.138 0.787,-0.255 1.22,-0.334 0.454,-0.08 0.926,-0.118 1.399,-0.118 h 29.373 c 0.63,-1.611 0.118,-2.81 -1.536,-3.575 -1.633,-0.767 -3.995,-1.14 -7.047,-1.14 h -22.74 c -1.338,0 -2.637,0.099 -3.898,0.295 -1.26,0.177 -2.44,0.491 -3.504,0.923 -1.083,0.432 -1.988,0.963 -2.756,1.61 -0.768,0.63 -1.32,1.415 -1.654,2.319 L 197.23,116 c -0.276,0.806 -0.256,1.494 0.078,2.064 0.335,0.569 0.887,1.06 1.654,1.453 0.748,0.413 1.693,0.708 2.816,0.904 1.121,0.196 2.323,0.275 3.602,0.275 h 23.25 l -1.062,2.848 c -0.079,0.138 -0.196,0.256 -0.355,0.393 -0.255,0.197 -0.57,0.374 -0.944,0.53 -0.374,0.138 -0.768,0.256 -1.22,0.335 -0.454,0.078 -0.926,0.098 -1.4,0.098 h -1.023 v 0.02 h -28.684 c -0.275,0.746 -0.237,1.414 0.137,1.984 0.395,0.588 1.005,1.06 1.832,1.473 0.826,0.412 1.83,0.707 3.012,0.884 1.162,0.196 2.382,0.295 3.682,0.295 h 23.172 c 3.15,0 5.808,-0.373 7.972,-1.14 2.166,-0.766 3.565,-1.965 4.195,-3.576 l 1.575,-4.419 c 0.275,-0.766 0.216,-1.434 -0.158,-2.004 -0.374,-0.57 -0.984,-1.041 -1.81,-1.395 -0.848,-0.353 -1.852,-0.609 -3.053,-0.785 -1.181,-0.157 -2.421,-0.237 -3.72,-0.237 h -23.39 l 0.965,-2.631 c 0.099,-0.197 0.237,-0.374 0.433,-0.53"
                />
            </g>
            <g clip-path="url(#clip2)" opacity=".3">
                <path
                    fill="#d8232a"
                    fillRule="evenodd"
                    d="M 115.76172 0 C 112.59172 0 109.97378 0.29428125 107.92578 0.86328125 C 105.87878 1.4332812 104.14694 2.1618594 102.71094 3.0058594 C 101.29294 3.8708594 100.07087 4.8120469 99.046875 5.8730469 C 98.102875 6.8540469 55.813438 60.112875 55.773438 60.171875 L 84.123047 81.445312 C 85.148047 81.995312 86.171312 82.605844 87.195312 83.214844 C 88.218312 83.842844 89.439422 84.411828 90.857422 84.923828 C 92.274422 85.433828 94.027219 85.865219 96.074219 86.199219 C 98.102219 86.533219 100.73916 86.710937 103.91016 86.710938 L 123.7168 86.710938 L 89.085938 60.150391 L 135.56836 0 L 115.76172 0 z M 145.64648 21.195312 C 142.87148 21.195312 140.58788 21.452359 138.79688 21.943359 C 137.02488 22.453359 135.50658 23.083125 134.26758 23.828125 C 133.02758 24.575125 131.96413 25.399266 131.07812 26.322266 C 130.25113 27.167266 103.75236 60.073281 103.69336 60.113281 L 144.42773 90.738281 C 145.31373 91.229281 146.21852 91.758062 147.10352 92.289062 C 147.98952 92.839062 149.05492 93.331203 150.29492 93.783203 C 151.53492 94.235203 153.0498 94.587344 154.8418 94.902344 C 156.6318 95.197344 158.89783 95.335937 161.67383 95.335938 L 178.93945 95.335938 L 132.75195 60.111328 L 162.89453 21.195312 L 145.64648 21.195312 z "
                />
                <path
                    fill="#1c1b19"
                    fillRule="evenodd"
                    d="M 19.018,107.102 H 8.15 L 0,129.438 h 0.984 c 1.3,0 2.56,-0.059 3.8,-0.217 1.24,-0.137 2.382,-0.372 3.425,-0.707 1.064,-0.333 1.95,-0.766 2.698,-1.316 0.59,-0.452 1.023,-0.982 1.338,-1.59 z m 28.547,0 h -12.01 l -19.924,11.04 12.128,9.095 c 0.433,0.236 0.847,0.472 1.28,0.747 0.433,0.255 0.945,0.491 1.535,0.708 0.592,0.215 1.34,0.392 2.186,0.53 0.866,0.157 1.95,0.216 3.287,0.216 h 8.309 L 28.9,117.593 47.564,107.102 Z m 97.216,1.218 c -1.555,-0.786 -3.818,-1.18 -6.772,-1.18 H 113.91 c -1.338,0 -2.618,0.1 -3.859,0.316 -1.24,0.216 -2.382,0.53 -3.406,0.942 -1.023,0.393 -1.89,0.884 -2.598,1.454 -0.728,0.57 -1.201,1.199 -1.438,1.867 l -4.862,13.2 c -0.236,0.707 -0.217,1.336 0.099,1.886 0.314,0.55 0.826,1.022 1.535,1.435 0.728,0.392 1.634,0.707 2.717,0.923 1.103,0.215 2.323,0.314 3.662,0.314 h 24.097 c 1.378,0 2.697,-0.078 3.977,-0.236 1.26,-0.176 2.422,-0.451 3.465,-0.825 1.044,-0.392 1.93,-0.845 2.657,-1.395 0.71,-0.55 1.202,-1.218 1.497,-2.042 l 4.784,-13.202 c 0.571,-1.512 0.08,-2.672 -1.457,-3.457 z m -13.603,14.95 c -0.099,0.235 -0.276,0.45 -0.532,0.667 -0.256,0.197 -0.572,0.374 -0.945,0.531 -0.354,0.137 -0.769,0.255 -1.22,0.334 -0.454,0.078 -0.926,0.117 -1.399,0.117 h -18.466 l 4.193,-11.413 c 0.079,-0.236 0.256,-0.472 0.512,-0.668 0.256,-0.196 0.57,-0.373 0.945,-0.53 0.374,-0.138 0.787,-0.255 1.22,-0.334 0.453,-0.08 0.925,-0.118 1.398,-0.118 h 18.486 l -4.193,11.414 z M 95.267,108.359 c -1.516,-0.806 -3.76,-1.218 -6.772,-1.218 H 54.672 l -8.092,22.277 h 1.083 c 1.28,0 2.56,-0.06 3.82,-0.177 1.26,-0.118 2.441,-0.373 3.543,-0.747 2.087,-0.766 3.524,-2.2 4.293,-4.302 l 4.508,-12.336 h 22.03 l -1.575,4.086 c -0.079,0.236 -0.257,0.471 -0.512,0.668 -0.256,0.216 -0.57,0.393 -0.945,0.53 -0.374,0.157 -0.767,0.255 -1.22,0.334 -0.375,0.06 -0.768,0.098 -1.163,0.118 h -16.36 l 1.989,1.453 11.183,8.33 c 0.432,0.256 0.865,0.49 1.28,0.766 0.432,0.256 0.944,0.491 1.554,0.707 0.59,0.216 1.32,0.393 2.166,0.53 0.866,0.139 1.97,0.217 3.288,0.217 h 8.308 l -9.647,-7.289 h 0.551 c 2.442,-0.176 4.47,-0.608 6.083,-1.296 1.91,-0.805 3.131,-1.925 3.643,-3.36 l 2.165,-5.794 c 0.591,-1.532 0.119,-2.691 -1.378,-3.497 m 65.816,4.479 c 0.255,-0.216 0.57,-0.373 0.945,-0.53 0.373,-0.138 0.787,-0.255 1.22,-0.334 0.453,-0.08 0.925,-0.118 1.398,-0.118 h 29.374 c 0.63,-1.611 0.118,-2.81 -1.536,-3.575 -1.634,-0.767 -3.997,-1.14 -7.048,-1.14 h -22.74 c -1.338,0 -2.637,0.099 -3.897,0.295 -1.28,0.177 -2.442,0.491 -3.504,0.923 -1.084,0.432 -2.008,0.963 -2.756,1.61 -0.77,0.63 -1.32,1.415 -1.654,2.319 L 149.526,116 c -0.275,0.806 -0.256,1.494 0.078,2.064 0.336,0.569 0.887,1.06 1.635,1.453 0.767,0.413 1.712,0.708 2.835,0.904 1.121,0.196 2.324,0.275 3.603,0.275 h 23.25 l -1.063,2.848 c -0.078,0.138 -0.196,0.256 -0.354,0.393 -0.256,0.197 -0.571,0.374 -0.945,0.53 -0.374,0.138 -0.787,0.256 -1.24,0.335 -0.434,0.078 -0.906,0.098 -1.398,0.098 h -1.024 v 0.02 h -28.665 c -0.295,0.746 -0.236,1.414 0.137,1.984 0.395,0.588 1.006,1.06 1.833,1.473 0.826,0.412 1.83,0.707 2.991,0.884 1.182,0.196 2.402,0.295 3.702,0.295 h 23.172 c 3.15,0 5.808,-0.373 7.973,-1.14 2.166,-0.766 3.564,-1.965 4.194,-3.576 l 1.574,-4.419 c 0.276,-0.766 0.237,-1.434 -0.156,-2.004 -0.374,-0.57 -0.986,-1.041 -1.812,-1.395 -0.846,-0.353 -1.85,-0.609 -3.051,-0.785 -1.202,-0.157 -2.422,-0.237 -3.72,-0.237 h -23.39 l 0.964,-2.631 c 0.099,-0.197 0.217,-0.374 0.434,-0.53 m 47.702,-0.001 c 0.256,-0.216 0.571,-0.373 0.945,-0.53 0.374,-0.138 0.787,-0.255 1.22,-0.334 0.454,-0.08 0.926,-0.118 1.399,-0.118 h 29.373 c 0.63,-1.611 0.118,-2.81 -1.536,-3.575 -1.633,-0.767 -3.995,-1.14 -7.047,-1.14 h -22.74 c -1.338,0 -2.637,0.099 -3.898,0.295 -1.26,0.177 -2.44,0.491 -3.504,0.923 -1.083,0.432 -1.988,0.963 -2.756,1.61 -0.768,0.63 -1.32,1.415 -1.654,2.319 L 197.23,116 c -0.276,0.806 -0.256,1.494 0.078,2.064 0.335,0.569 0.887,1.06 1.654,1.453 0.748,0.413 1.693,0.708 2.816,0.904 1.121,0.196 2.323,0.275 3.602,0.275 h 23.25 l -1.062,2.848 c -0.079,0.138 -0.196,0.256 -0.355,0.393 -0.255,0.197 -0.57,0.374 -0.944,0.53 -0.374,0.138 -0.768,0.256 -1.22,0.335 -0.454,0.078 -0.926,0.098 -1.4,0.098 h -1.023 v 0.02 h -28.684 c -0.275,0.746 -0.237,1.414 0.137,1.984 0.395,0.588 1.005,1.06 1.832,1.473 0.826,0.412 1.83,0.707 3.012,0.884 1.162,0.196 2.382,0.295 3.682,0.295 h 23.172 c 3.15,0 5.808,-0.373 7.972,-1.14 2.166,-0.766 3.565,-1.965 4.195,-3.576 l 1.575,-4.419 c 0.275,-0.766 0.216,-1.434 -0.158,-2.004 -0.374,-0.57 -0.984,-1.041 -1.81,-1.395 -0.848,-0.353 -1.852,-0.609 -3.053,-0.785 -1.181,-0.157 -2.421,-0.237 -3.72,-0.237 h -23.39 l 0.965,-2.631 c 0.099,-0.197 0.237,-0.374 0.433,-0.53"
                />
            </g>
        </svg>)
}

export default AnimKross