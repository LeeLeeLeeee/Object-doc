/* eslint-disable react/no-unknown-property */
/** @jsxImportSource theme-ui */
import { useToastState } from 'recoils/toast';
import { AnimatePresence, motion } from 'framer-motion';
import { Portal } from '../portal';
import { LTText } from '../text';

export function ToastList() {
    const toasts = useToastState();

    return (
        <Portal>
            <div sx={{ variant: 'letten.toast.list' }}>
                <AnimatePresence>
                    {toasts.length > 0
                        ? toasts.map(({ id, content }) => (
                              <motion.div
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: [0.8, 0.2, 0], x: [0, -20] }}
                                  initial={{ opacity: 0, y: 10 }}
                                  key={id}
                                  layout
                                  sx={{ variant: 'letten.toast.content', '& > svg > path': { fill: 'white' } }}
                                  transition={{ ease: 'easeInOut' }}
                              >
                                  {typeof content === 'string' ? (
                                      <LTText $color="background" sx={{ lineHeight: '18px' }}>
                                          {content}
                                      </LTText>
                                  ) : (
                                      content
                                  )}
                              </motion.div>
                          ))
                        : null}
                </AnimatePresence>
            </div>
        </Portal>
    );
}
