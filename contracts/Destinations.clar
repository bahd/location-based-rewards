;; Define the allowed destinations and their associated rewards
(define-map destinations ((lat int) (lon int)) 
  { :name (string-ascii 100)
    :reward-amount uint })

;; Define the staking function
(define-public (stake-location (lat int) (lon int))
  (begin
    ;; Check if the location is an allowed destination
    (let ((destination (get-or-fail? destinations (tuple (lat lat) (lon lon)))))
      ;; Award tokens based on the destination's reward amount
      (print "Awarded" (get :reward-amount destination) "location tokens!")
      (ft-mint? location-tokens (principal-of?) (get :reward-amount destination)))))